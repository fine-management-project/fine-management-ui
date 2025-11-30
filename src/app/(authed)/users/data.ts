"use server";
import { AxiosError } from "axios";
import { AdminUserService } from "@/lib/api/admin/AdminUserService/AdminUserService";
import { ApiError, PaginatedPageData } from "@/lib/api/types";
import { User } from "@/lib/models/user";
import { createServerSession } from "@/lib/session/server";
import { wrapServerSideFetching } from "@/lib/api/utils";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export const getPageData = wrapServerSideFetching<
  PaginatedPageData<User[]>,
  null
>(async (): Promise<PaginatedPageData<User[]>> => {
  try {
    const session = await createServerSession();

    const service = new AdminUserService(session);
    const { data, total } = await service.getUsers(undefined, undefined, {
      offset: DEFAULT_OFFSET,
      limit: DEFAULT_LIMIT,
    });

    return {
      data,
      total,
      defaultLimit: DEFAULT_LIMIT,
      defaultOffset: DEFAULT_OFFSET,
    };
  } catch (e) {
    return {
      data: null,
      total: null,
      error: e as AxiosError<ApiError>,
      defaultLimit: DEFAULT_LIMIT,
      defaultOffset: DEFAULT_OFFSET,
    };
  }
});
