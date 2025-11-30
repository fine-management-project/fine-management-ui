import { Session } from "@/lib/session/Session";
import { userManagementApiClient } from "../../axios";
import { BaseService } from "../../BaseService";
import { ApiPaginatedResponse } from "../../types";
import { Role } from "@/lib/models/role";

export class AdminRolesService extends BaseService {
  constructor(session: Session) {
    super(userManagementApiClient, session);
  }

  async getAllRoles(): Promise<ApiPaginatedResponse<Role[]>> {
    return (await this.apiClient.get("/admin/roles")).data;
  }
}
