import { Session } from "@/lib/session/Session";

import { User } from "@/lib/models/user";
import { userManagementApiClient } from "../../axios";
import { BaseService } from "../../BaseService";
import {
  ApiPaginatedResponse,
  ApiResponse,
  PaginationOptions,
  SortingOptions,
} from "../../types";
import {
  GetUsersFilters,
  GetUsersSortingKey,
  UpdateUserBlockedStatusPayload,
  UpdateUserRolesPayload,
} from "./types";

export class AdminUserService extends BaseService {
  constructor(session: Session) {
    super(userManagementApiClient, session);
  }

  async getUsers(
    filters?: GetUsersFilters,
    sortingOptions?: SortingOptions<GetUsersSortingKey>,
    paginationOptions?: PaginationOptions
  ): Promise<ApiPaginatedResponse<User[]>> {
    return (
      await this.apiClient.post("/admin/users", {
        filters,
        sortingOptions,
        paginationOptions,
      })
    ).data;
  }

  async updateUserRoles(
    id: string,
    payload: UpdateUserRolesPayload
  ): Promise<ApiResponse<User>> {
    return (
      await this.apiClient.patch(`/admin/users/${id}/roles`, {
        ...payload,
      })
    ).data;
  }

  async updateUserBlockedStatus(
    id: string,
    payload: UpdateUserBlockedStatusPayload
  ): Promise<ApiResponse<User>> {
    return (
      await this.apiClient.patch(`/admin/users/${id}/blocked`, {
        ...payload,
      })
    ).data;
  }

  async deleteUserById(id: string): Promise<void> {
    return this.apiClient.delete(`/admin/users/${id}`);
  }
}
