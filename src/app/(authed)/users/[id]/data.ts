import { ApiError, PageData } from "@/lib/api/types";
import { UserService } from "@/lib/api/UserService/UserService";
import { wrapServerSideFetching } from "@/lib/api/utils";
import { User } from "@/lib/models/user";
import { createServerSession } from "@/lib/session/server";
import { AxiosError } from "axios";

export const getPageData = wrapServerSideFetching<PageData<User>, string>(
  async (id: string): Promise<PageData<User>> => {
    try {
      const session = await createServerSession();
      const service = new UserService(session);

      const { data } = await service.getUserById(id);

      return {
        data,
      };
    } catch (e) {
      return {
        data: null,
        error: e as AxiosError<ApiError>,
      };
    }
  }
);
