import { Session } from "@/lib/session/Session";
import { BaseService } from "../BaseService";
import { fineManagementApiClient } from "../axios";
import { GetFinesFilters, GetFinesSortingParams } from "./types";
import {
  ApiPaginatedResponse,
  PaginationOptions,
  SortingOptions,
} from "../types";
import { Fine } from "@/lib/models/fine";

export class FineService extends BaseService {
  constructor(session: Session) {
    super(fineManagementApiClient, session);
  }

  async getFinesForUser(
    userId: string,
    filters?: GetFinesFilters,
    sortingOptions?: SortingOptions<GetFinesSortingParams>,
    paginationOptions?: PaginationOptions
  ): Promise<ApiPaginatedResponse<Fine[]>> {
    return (
      await this.apiClient.post(`/fines/user/${userId}`, {
        filters,
        sortingOptions,
        paginationOptions,
      })
    ).data;
  }
}
