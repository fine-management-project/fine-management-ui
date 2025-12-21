import { UserService } from "@/lib/api/UserService/UserService";
import { User } from "@/lib/models/user";
import { SessionContext } from "@/lib/session/SessionContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useContext } from "react";

export type UseRequestChanges = {
  requestEmailVerification: () => Promise<void>;
  isRequestVerificationLoading: boolean;
  requestChangeUserEmail: () => Promise<void>;
  isRequestChangeUserEmailLoading: boolean;
};

type Props = {
  user: User;
};

export const useRequestChanges = ({ user }: Props): UseRequestChanges => {
  const { session } = useContext(SessionContext);

  const mutationRequestEmailVerification = useMutation<
    void,
    AxiosError<ApiError>
  >({
    mutationFn: async (): Promise<void> => {
      const client = new UserService(session);

      return client.requestUserEmailVerification(user.id ?? "");
    },
  });

  const requestEmailVerification = async () => {
    try {
      await mutationRequestEmailVerification.mutate();
    } catch (e) {
      console.error(e);
    }
  };

  const mutationRequestChangeUserEmail = useMutation<
    void,
    AxiosError<ApiError>
  >({
    mutationFn: async (): Promise<void> => {
      const client = new UserService(session);

      return client.requestChangeUserEmail(user.id ?? "");
    },
  });

  const requestChangeUserEmail = async () => {
    try {
      await mutationRequestChangeUserEmail.mutate();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isRequestVerificationLoading: mutationRequestEmailVerification.isPending,
    requestEmailVerification,
    isRequestChangeUserEmailLoading: mutationRequestChangeUserEmail.isPending,
    requestChangeUserEmail,
  };
};
