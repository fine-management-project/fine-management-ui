import { AuthService } from "@/lib/api/AuthService/AuthService";
import { SignInPayload } from "@/lib/api/AuthService/types";
import { Session } from "@/lib/session/Session";
import { SessionContext } from "@/lib/session/SessionContext";
import { ROUTES, RoutesId } from "@/routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export type UseSignIn = {
  onSignIn: (payload: SignInPayload) => Promise<void>;
  error?: string;
  loading: boolean;
};

export const useSignIn = () => {
  const { session, setSession } = useContext(SessionContext);
  const router = useRouter();

  const mutationSignIn = useMutation<void, AxiosError<ApiError>, SignInPayload>(
    {
      mutationFn: async (payload: SignInPayload): Promise<void> => {
        const authClient = new AuthService();

        const { data } = await authClient.signIn(payload);

        const newSession = new Session();
        newSession.setToken(data.accessToken);
        newSession.setUserId(data.id);

        setSession(newSession);
      },
    }
  );

  const onSignIn = async (payload: SignInPayload): Promise<void> => {
    await mutationSignIn.mutate(payload);
  };

  useEffect(() => {
    const userId = session.getUserId();

    if (userId) router.push(ROUTES[RoutesId.dashboard].url);
  }, [router, session]);

  return {
    onSignIn: onSignIn,
    error:
      mutationSignIn.error?.response?.data.message ??
      mutationSignIn.error?.message,
    loading: mutationSignIn.isPending,
  };
};
