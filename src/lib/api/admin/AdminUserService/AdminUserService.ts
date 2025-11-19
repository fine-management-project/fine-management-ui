import { Session } from "@/lib/session/Session";

import { User } from "@/lib/models/user";
import { userManagementApiClient } from "../../axios";
import { BaseService } from "../../BaseService";
import {
  ApiPaginatedResponse,
  PaginationOptions,
  SortingOptions,
} from "../../types";
import { GetUsersFilters, GetUsersSortingKey } from "./types";

export class AdminUserService extends BaseService {
  constructor(session: Session) {
    super(userManagementApiClient, session);
  }

  async getUsers(
    filters?: GetUsersFilters,
    sortingOptions?: SortingOptions<GetUsersSortingKey>,
    paginationOption?: PaginationOptions
  ): Promise<ApiPaginatedResponse<User[]>> {
    return this.apiClient.post("/admin/users", {
      filters,
      sortingOptions,
      paginationOption,
    });
  }
}
