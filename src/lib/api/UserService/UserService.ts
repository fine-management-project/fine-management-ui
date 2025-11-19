import { Session } from "@/lib/session/Session";
import { BaseService } from "../BaseService";
import { userManagementApiClient } from "../axios";
import { ApiResponse } from "../types";
import { User } from "@/lib/models/user";

export class UserService extends BaseService {
  constructor(session: Session) {
    super(userManagementApiClient, session);
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return (await this.apiClient.get(`/users/${id}`)).data;
  }
}
