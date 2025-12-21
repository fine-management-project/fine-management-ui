"use client";
import { AuthService } from "@/lib/api/AuthService/AuthService";
import { ApiError } from "@/lib/api/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

export type ChangePasswordFormData = {
  password: string;
  confirmPassword: string;
};

export type UseChangePasswordForm = {
  handleSubmit: (payload: ChangePasswordFormData) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  error?: string;
};

export const useChangePasswordForm = () => {
  const searchParams = useSearchParams();

  const forgotPasswordToken: string =
    searchParams.get("forgot-password-token")?.replaceAll("\\", "") ?? "";

  const mutationChangePassword = useMutation<
    void,
    AxiosError<ApiError>,
    string
  >({
    mutationFn: async (password: string): Promise<void> => {
      const authClient = new AuthService();
      return authClient.changeUserPassword({
        newPassword: password,
        forgotPasswordToken,
      });
    },
  });

  const handleSubmit = async (data: ChangePasswordFormData) => {
    try {
      mutationChangePassword.mutateAsync(data.password);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleSubmit,
    isLoading: mutationChangePassword.isPending,
    isSuccess: mutationChangePassword.isSuccess,
    error: mutationChangePassword.error?.message,
  };
};
