"use client";
import { AuthService } from "@/lib/api/AuthService/AuthService";
import { UserService } from "@/lib/api/UserService/UserService";
import { SessionContext } from "@/lib/session/SessionContext";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { ROUTES, RoutesId } from "@/routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

export type UseChangeUserEmail = {
  changeEmailToken: string | null;
  onSubmit: (values: { newEmail: string }) => void;
  isLoading: boolean;
  error?: string;
};

export const useChangeUserEmail = (): UseChangeUserEmail => {
  const { session } = useContext(SessionContext);
  const { user, setUser } = useContext(UserContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const changeEmailToken: string =
    searchParams.get("change-email-token")?.replaceAll("\\", "") ?? "";

  const mutationVerifyUserEmail = useMutation<
    void,
    AxiosError<ApiError>,
    string
  >({
    mutationFn: async (newEmail: string): Promise<void> => {
      try {
        const userClient = new UserService(session);

        const { data } = await userClient.changeUserEmail(user?.id ?? "", {
          changeEmailToken: changeEmailToken,
          newEmail,
        });

        setUser(data);

        const token = session.getToken();

        if (token) {
          const authClient = new AuthService();
          await authClient.signOut(token);
        }
      } finally {
        session.clear();
        router.push(ROUTES[RoutesId.home].url);
      }
    },
  });

  const onSubmit = (values: { newEmail: string }) => {
    mutationVerifyUserEmail.mutateAsync(values.newEmail);
  };

  return {
    changeEmailToken,
    onSubmit,
    error: mutationVerifyUserEmail.error?.message,
    isLoading: mutationVerifyUserEmail.isPending,
  };
};
