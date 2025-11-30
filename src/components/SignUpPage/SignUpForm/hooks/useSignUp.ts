"use client";

import { useCountries } from "@/hooks/useCountries";
import { AuthService } from "@/lib/api/AuthService/AuthService";
import { SignUpPayload } from "@/lib/api/AuthService/types";
import { DropdownOption } from "@/lib/models/common/option";
import { Session } from "@/lib/session/Session";
import { SessionContext } from "@/lib/session/SessionContext";
import { ROUTES, RoutesId } from "@/routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

type UseSignUpType = {
  countryOptions: DropdownOption<number>[];
  isCountryOptionsLoading: boolean;
  onSignUp: (payload: SignUpPayload) => Promise<void>;
  loading: boolean;
  error?: string;
};

export const useSignUp = (): UseSignUpType => {
  const { session, setSession } = useContext(SessionContext);
  const router = useRouter();

  const { countryOptions, isLoading: isCountryOptionsLoading } = useCountries();

  const mutationSignUp = useMutation<void, AxiosError<ApiError>, SignUpPayload>(
    {
      mutationFn: async (payload: SignUpPayload): Promise<void> => {
        const authClient = new AuthService();

        const { data } = await authClient.signUp(payload);

        const newSession = new Session();
        newSession.setToken(data.accessToken);
        newSession.setUserId(data.id);

        setSession(newSession);
      },
    }
  );

  const onSignUp = async (payload: SignUpPayload): Promise<void> => {
    await mutationSignUp.mutate(payload);
  };

  useEffect(() => {
    const userId = session.getUserId();

    if (userId) router.push(ROUTES[RoutesId.dashboard].url);
  }, [router, session]);

  return {
    onSignUp,
    error:
      mutationSignUp.error?.response?.data.message ??
      mutationSignUp.error?.message,
    loading: mutationSignUp.isPending,
    isCountryOptionsLoading,
    countryOptions,
  };
};
