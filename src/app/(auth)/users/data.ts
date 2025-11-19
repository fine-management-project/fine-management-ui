import { AdminUserService } from "@/lib/api/admin/AdminUserService/AdminUserService";
import { ApiError } from "@/lib/api/types";
import { User } from "@/lib/models/user";
import { createServerSession } from "@/lib/session/server";

export type PageData = {
  error?: ApiError;
  data: User[] | null;
  total: number | null;
};

export const getPageData = async (): Promise<PageData> => {
  try {
    const session = await createServerSession();

    const service = new AdminUserService(session);
    const { data, total } = await service.getUsers();

    return {
      data,
      total,
    };
  } catch (e) {
    return {
      data: null,
      total: null,
      error: e as ApiError,
    };
  }
};
