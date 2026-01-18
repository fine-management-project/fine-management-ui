import { Session } from "@/lib/session/Session";
import { paymentManagementApiClient } from "../axios";
import { BaseService } from "../BaseService";
import { ApiResponse } from "../types";

export class PaymentService extends BaseService {
  constructor(session: Session) {
    super(paymentManagementApiClient, session);
  }

  async requestPaymentForFineById(
    fineId: string
  ): Promise<ApiResponse<string>> {
    return (await this.apiClient.post(`/pay/fines/${fineId}`)).data;
  }
}
