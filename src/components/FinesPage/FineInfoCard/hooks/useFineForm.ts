import { AdminFineService } from "@/lib/api/admin/AdminFineService/AdminFineService";
import { CreateFinePayload } from "@/lib/api/admin/AdminFineService/types";
import { Currency } from "@/lib/models/currency";
import { Fine, FineStatus, FineType } from "@/lib/models/fine";
import { SessionContext } from "@/lib/session/SessionContext";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { Dispatch, SetStateAction, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";
import { FINES_QUERY_KEY } from "../../FinesTableSection/hooks";

export type UseFineForm = {
  form: UseFormReturn<FineFormFields, null, FineFormFields>;
  isEditStatusDisabled: boolean;
  handleSubmit: (fields: FineFormFields) => Promise<void>;
  isLoading: boolean;
  error?: string;
};

export type Props = {
  fine: Fine | null;
  userId: string;
  setSelectedFine: Dispatch<SetStateAction<Fine | null>>;
};

export type FineFormFields = {
  reason: string;
  amount: number;
  currency: Currency;
  type: FineType;
  status: FineStatus;
};

const formSchema = z.object({
  reason: z.string().min(20, {
    message: "Reason should have at least 20 characters!",
  }),
  amount: z.float32().positive({
    message: "Amount should be more than 0!",
  }),
  currency: z.enum(Currency),
  type: z.enum(FineType),
  status: z.enum(FineStatus),
});

export const useFineForm = ({ fine, userId, setSelectedFine }: Props) => {
  const { isCurrentUserAdmin, user: currentUser } = useContext(UserContext);
  const isEditStatusDisabled = !(isCurrentUserAdmin && fine !== null);
  const { session } = useContext(SessionContext);
  const queryClient = useQueryClient();
  const isEdit = !!fine;

  const mutationCreateFine = useMutation<
    Fine,
    AxiosError<ApiError>,
    CreateFinePayload
  >({
    mutationFn: async (payload: CreateFinePayload): Promise<Fine> => {
      const adminFineService = new AdminFineService(session);

      return (await adminFineService.createFine(payload)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FINES_QUERY_KEY] });
      setSelectedFine(null);
    },
  });

  const mutationUpdateFine = useMutation<
    Fine,
    AxiosError<ApiError>,
    { fineId: string; payload: FineFormFields }
  >({
    mutationFn: async (variables: {
      fineId: string;
      payload: FineFormFields;
    }): Promise<Fine> => {
      const adminFineService = new AdminFineService(session);

      let fine = await (
        await adminFineService.updateFineCommonFields(
          variables.fineId,
          variables.payload
        )
      ).data;

      if (!isEditStatusDisabled) {
        fine = (
          await adminFineService.updateFineStatus(
            variables.fineId,
            variables.payload.status
          )
        ).data;
      }

      return fine;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FINES_QUERY_KEY] });
    },
  });

  const handleSubmit = (payload: FineFormFields) => {
    if (!currentUser) return;

    if (isEdit) {
      mutationUpdateFine.mutateAsync({
        fineId: fine.id,
        payload,
      });
    } else {
      mutationCreateFine.mutateAsync({
        issuerId: currentUser.id,
        userId,
        ...payload,
      });
    }
  };

  const isLoading =
    mutationCreateFine.isPending || mutationUpdateFine.isPending;

  const form = useForm<FineFormFields>({
    resolver: zodResolver(formSchema),
    disabled: isLoading || !isCurrentUserAdmin,
    defaultValues: {
      reason: fine?.reason ?? "",
      amount: fine?.amount ?? 0.1,
      currency: fine?.currency ?? Currency.USD,
      type: fine?.type ?? FineType.TAX,
      status: fine?.status ?? FineStatus.NEW,
    },
  });

  return {
    form,
    isEditStatusDisabled,
    handleSubmit,
    isLoading,
    error:
      mutationCreateFine.error?.message || mutationUpdateFine.error?.message,
  };
};
