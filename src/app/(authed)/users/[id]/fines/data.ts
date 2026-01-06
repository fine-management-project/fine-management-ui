import { FineService } from "@/lib/api/FineService/FineService";
import { ApiError, PaginatedPageData } from "@/lib/api/types";
import { wrapServerSideFetching } from "@/lib/api/utils";
import { Fine } from "@/lib/models/fine";
import { createServerSession } from "@/lib/session/server";
import { AxiosError } from "axios";

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

export const getPageData = wrapServerSideFetching<
  PaginatedPageData<Fine[]>,
  string
>(async (id: string): Promise<PaginatedPageData<Fine[]>> => {
  try {
    const session = await createServerSession();
    const service = new FineService(session);

    const { data, total } = await service.getFinesForUser(
      id,
      undefined,
      undefined,
      {
        limit: DEFAULT_LIMIT,
        offset: DEFAULT_OFFSET,
      }
    );

    return {
      data,
      total,
      defaultOffset: DEFAULT_OFFSET,
      defaultLimit: DEFAULT_LIMIT,
    };
  } catch (e) {
    return {
      data: null,
      defaultOffset: DEFAULT_OFFSET,
      defaultLimit: DEFAULT_LIMIT,
      total: null,
      error: e as AxiosError<ApiError>,
    };
  }
});
