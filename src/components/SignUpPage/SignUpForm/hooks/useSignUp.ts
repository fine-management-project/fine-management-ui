"use client";

import { AuthService } from "@/lib/api/AuthService/AuthService";
import { SignUpPayload } from "@/lib/api/AuthService/types";
import { GeneralCountriesService } from "@/lib/api/general/GeneralCountriesService/GeneralCountriesService";
import { UserService } from "@/lib/api/UserService/UserService";
import { DropdownOption } from "@/lib/models/common/option";
import { Country } from "@/lib/models/country";
import { SessionContext } from "@/lib/session/SessionContext";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { ROUTES, RoutesId } from "@/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo } from "react";

type UseSignUpType = {
  countryOptions: DropdownOption<number>[];
  isCountryOptionsLoading: boolean;
  onSignUp: (payload: SignUpPayload) => Promise<void>;
  loading: boolean;
  error?: string;
};

export const useSignUp = (): UseSignUpType => {
  const { session } = useContext(SessionContext);
  const { setUser, user } = useContext(UserContext);
  const router = useRouter();

  const { data: countries, isPending: isCountryOptionsLoading } = useQuery<
    Country[],
    AxiosError,
    Country[]
  >({
    queryKey: ["countryOptions"],
    queryFn: async (): Promise<Country[]> => {
      const client = new GeneralCountriesService();

      const { data } = await client.getAvailableCountries();

      return data;
    },
  });

  const countryOptions: DropdownOption<number>[] = useMemo(
    () =>
      countries
        ? countries.map((country) => {
            return { label: country.name, value: country.id };
          })
        : [],
    [countries]
  );

  const mutationSignUp = useMutation<void, AxiosError<ApiError>, SignUpPayload>(
    {
      mutationFn: async (payload: SignUpPayload): Promise<void> => {
        const authClient = new AuthService();

        const { data } = await authClient.signUp(payload);

        session.setToken(data.accessToken);
        session.setUserId(data.id);

        const userClient = new UserService(session);

        const userResult = await userClient.getUserById(data.id);

        setUser(userResult.data);
      },
    }
  );

  const onSignUp = async (payload: SignUpPayload): Promise<void> => {
    await mutationSignUp.mutate(payload);
  };

  useEffect(() => {
    if (user) router.push(ROUTES[RoutesId.profile].url.replace(":id", user.id));
  }, [router, user]);

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
