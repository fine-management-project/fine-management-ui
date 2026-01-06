import { AdminFineService } from "@/lib/api/admin/AdminFineService/AdminFineService";
import { SessionContext } from "@/lib/session/SessionContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { FINES_QUERY_KEY } from "./useFinesTableData";

export type UseDeleteFine = {
  onDeleteFine: () => void;
  isLoading: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type Props = {
  fineId: string;
};

export const useDeleteFine = ({ fineId }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { session } = useContext(SessionContext);
  const queryClient = useQueryClient();

  const mutationDeleteFineById = useMutation<void, AxiosError<ApiError>>({
    mutationFn: async (): Promise<void> => {
      const adminFineClient = new AdminFineService(session);

      return await adminFineClient.deleteFine(fineId);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [FINES_QUERY_KEY],
      });
    },
  });

  return {
    onDeleteFine: mutationDeleteFineById.mutateAsync,
    isLoading: mutationDeleteFineById.isPending,
    setOpen,
    open,
  };
};
