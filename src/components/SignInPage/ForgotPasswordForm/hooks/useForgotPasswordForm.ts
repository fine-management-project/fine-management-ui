import { AuthService } from "@/lib/api/AuthService/AuthService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

type UseForgotPasswordForm = {
  handleSubmit: (value: { email: string }) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  error?: string;
};

export const useForgotPasswordForm = (): UseForgotPasswordForm => {
  const mutationRequestForgotPassword = useMutation<
    void,
    AxiosError<ApiError>,
    string
  >({
    mutationFn: async (email: string): Promise<void> => {
      const client = new AuthService();

      return client.requestForgotPassword(email);
    },
  });

  const handleSubmit = async (value: { email: string }) => {
    try {
      await mutationRequestForgotPassword.mutate(value.email);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleSubmit,
    isLoading: mutationRequestForgotPassword.isPending,
    isSuccess: mutationRequestForgotPassword.isSuccess,
    error: mutationRequestForgotPassword.error?.message,
  };
};
