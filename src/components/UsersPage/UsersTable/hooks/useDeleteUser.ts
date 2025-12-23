"use client";
import { AdminUserService } from "@/lib/api/admin/AdminUserService/AdminUserService";
import { SessionContext } from "@/lib/session/SessionContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { USERS_QUERY_KEY } from "../constants";

export type UseDeleteUser = {
  onDeleteUser: () => void;
  isLoading: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type Props = {
  userId: string;
};

export const useDeleteUser = ({ userId }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { session } = useContext(SessionContext);
  const queryClient = useQueryClient();

  const mutationDeleteUserById = useMutation<void, AxiosError<ApiError>>({
    mutationFn: async (): Promise<void> => {
      const adminUserClient = new AdminUserService(session);

      return await adminUserClient.deleteUserById(userId);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEY],
      });
    },
  });

  return {
    onDeleteUser: mutationDeleteUserById.mutateAsync,
    isLoading: mutationDeleteUserById.isPending,
    setOpen,
    open,
  };
};
