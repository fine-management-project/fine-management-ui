"use client";
import { UserService } from "@/lib/api/UserService/UserService";
import { SessionContext } from "@/lib/session/SessionContext";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { ROUTES, RoutesId } from "@/routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

export type UseVerifyEmail = {
  verificationToken: string | null;
  onVerify: () => void;
  isLoading: boolean;
  error?: string;
};

export const useVerifyEmail = (): UseVerifyEmail => {
  const { session } = useContext(SessionContext);
  const { user, setUser } = useContext(UserContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const verificationToken: string =
    searchParams.get("verification-token")?.replaceAll("\\", "") ?? "";

  const mutationVerifyUserEmail = useMutation<void, AxiosError<ApiError>>({
    mutationFn: async (): Promise<void> => {
      const userClient = new UserService(session);

      const { data } = await userClient.verifyUserEmail(user?.id ?? "", {
        verificationToken: verificationToken,
      });

      setUser(data);

      if (user?.id)
        router.push(ROUTES[RoutesId.profile].url.replace(":id", user.id));
    },
  });

  const onVerify = () => {
    mutationVerifyUserEmail.mutateAsync();
  };

  return {
    verificationToken,
    onVerify,
    error: mutationVerifyUserEmail.error?.message,
    isLoading: mutationVerifyUserEmail.isPending,
  };
};
