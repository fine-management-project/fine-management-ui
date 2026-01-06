import { Session } from "@/lib/session/Session";
import { BaseService } from "../../BaseService";
import { fineManagementApiClient } from "../../axios";
import { ApiResponse } from "../../types";
import { Fine, FineStatus } from "@/lib/models/fine";
import { CreateFinePayload, UpdateFineCommonFieldsPayload } from "./types";

export class AdminFineService extends BaseService {
  constructor(session: Session) {
    super(fineManagementApiClient, session);
  }

  async createFine(payload: CreateFinePayload): Promise<ApiResponse<Fine>> {
    return (
      await this.apiClient.post("/admin/fines", {
        ...payload,
      })
    ).data;
  }

  async deleteFine(fineId: string): Promise<void> {
    return this.apiClient.delete(`/admin/fines/${fineId}`);
  }

  async updateFineStatus(
    fineId: string,
    newStatus: FineStatus
  ): Promise<ApiResponse<Fine>> {
    return (
      await this.apiClient.patch(`/admin/fines/${fineId}/status`, {
        status: newStatus,
      })
    ).data;
  }

  async updateFineCommonFields(
    fineId: string,
    payload: UpdateFineCommonFieldsPayload
  ): Promise<ApiResponse<Fine>> {
    return (
      await this.apiClient.patch(`/admin/fines/${fineId}/common-fields`, {
        ...payload,
      })
    ).data;
  }
}
