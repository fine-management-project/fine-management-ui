import { AuthService } from "@/lib/api/AuthService/AuthService";
import { SignInPayload } from "@/lib/api/AuthService/types";
import { UserService } from "@/lib/api/UserService/UserService";
import { SessionContext } from "@/lib/session/SessionContext";
import { UserContext } from "@/lib/state/UserContext/UserContext";
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
  const { session } = useContext(SessionContext);
  const { setUser, user } = useContext(UserContext);
  const router = useRouter();

  const mutationSignIn = useMutation<void, AxiosError<ApiError>, SignInPayload>(
    {
      mutationFn: async (payload: SignInPayload): Promise<void> => {
        const authClient = new AuthService();

        const { data } = await authClient.signIn(payload);

        session.setToken(data.accessToken);
        session.setUserId(data.id);

        const userClient = new UserService(session);

        const userResult = await userClient.getUserById(data.id);

        setUser(userResult.data);
      },
    }
  );

  const onSignIn = async (payload: SignInPayload): Promise<void> => {
    await mutationSignIn.mutate(payload);
  };

  useEffect(() => {
    if (user) router.push(ROUTES[RoutesId.profile].url.replace(":id", user.id));
  }, [router, user]);

  return {
    onSignIn: onSignIn,
    error:
      mutationSignIn.error?.response?.data.message ??
      mutationSignIn.error?.message,
    loading: mutationSignIn.isPending,
  };
};
