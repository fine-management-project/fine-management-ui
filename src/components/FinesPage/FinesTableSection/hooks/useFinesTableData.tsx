import { FineService } from "@/lib/api/FineService/FineService";
import { GetFinesFilters } from "@/lib/api/FineService/types";
import { PagePaginationOptions } from "@/lib/api/types";
import { compareParamsForInitialData } from "@/lib/api/utils";
import { Fine } from "@/lib/models/fine";
import { SessionContext } from "@/lib/session/SessionContext";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useContext, useState } from "react";

export type UseFinesTableData = {
  appliedFilters: GetFinesFilters;
  setAppliedFilters: Dispatch<SetStateAction<GetFinesFilters>>;
  setPagination: Dispatch<SetStateAction<PagePaginationOptions>>;
  pagination: PagePaginationOptions;
  data: Fine[];
  total: number;
  isLoading: boolean;
};

type Props = {
  userId: string;
  initialFines: Fine[];
  initialTotal: number;
  initialOffset: number;
  initialLimit: number;
};

export const FINES_QUERY_KEY = "FinesByUser";

export const useFinesTableData = ({
  userId,
  initialFines,
  initialLimit,
  initialOffset,
  initialTotal,
}: Props): UseFinesTableData => {
  const [appliedFilters, setAppliedFilters] = useState<GetFinesFilters>({});
  const initialPagination: PagePaginationOptions = {
    pageIndex: initialOffset,
    pageSize: initialLimit,
  };
  const [pagination, setPagination] = useState(initialPagination);
  const { session } = useContext(SessionContext);

  const { data, isLoading } = useQuery({
    queryKey: [
      FINES_QUERY_KEY,
      pagination.pageIndex,
      pagination.pageSize,
      appliedFilters,
    ],
    queryFn: async () => {
      const service = new FineService(session);
      const { data, total } = await service.getFinesForUser(
        userId,
        appliedFilters,
        undefined,
        {
          offset: pagination.pageIndex * pagination.pageSize,
          limit: pagination.pageSize,
        }
      );

      return {
        fines: data,
        total,
      };
    },
    initialData: () =>
      compareParamsForInitialData(
        { ...pagination, filters: appliedFilters },
        {
          ...initialPagination,
          filters: {},
        },
        {
          fines: initialFines,
          total: initialTotal,
        }
      ),
  });

  return {
    appliedFilters,
    setAppliedFilters,
    data: data?.fines ?? initialFines ?? [],
    total: data?.total ?? initialTotal ?? 0,
    isLoading,
    pagination,
    setPagination,
  };
};
