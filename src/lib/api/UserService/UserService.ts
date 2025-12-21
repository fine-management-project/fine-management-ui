import { Session } from "@/lib/session/Session";
import { BaseService } from "../BaseService";
import { userManagementApiClient } from "../axios";
import { ApiResponse } from "../types";
import { User } from "@/lib/models/user";
import {
  ChangeUserEmailPayload,
  UpdateUserCommonFields,
  VerifyUserEmailPayload,
} from "./types";

export class UserService extends BaseService {
  constructor(session: Session) {
    super(userManagementApiClient, session);
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return (await this.apiClient.get(`/users/${id}`)).data;
  }

  async updateUserCommonFields(
    id: string,
    payload: UpdateUserCommonFields
  ): Promise<ApiResponse<User>> {
    return (
      await this.apiClient.patch(`/users/${id}`, {
        ...payload,
      })
    ).data;
  }

  async verifyUserEmail(
    id: string,
    payload: VerifyUserEmailPayload
  ): Promise<ApiResponse<User>> {
    return (
      await this.apiClient.patch(`/users/${id}/verify-email`, {
        ...payload,
      })
    ).data;
  }

  async requestUserEmailVerification(id: string): Promise<void> {
    return await this.apiClient.post(
      `/users/${id}/request-user-email-verification`
    );
  }

  async requestChangeUserEmail(id: string): Promise<void> {
    return await this.apiClient.post(`/users/${id}/request-change-user-email`);
  }

  async changeUserEmail(
    id: string,
    payload: ChangeUserEmailPayload
  ): Promise<ApiResponse<User>> {
    return (
      await this.apiClient.patch(`/users/${id}/change-email`, {
        ...payload,
      })
    ).data;
  }
}
