import { Country } from "@/lib/models/country";
import { userManagementApiClient } from "../../axios";
import { BaseService } from "../../BaseService";
import { ApiResponse } from "../../types";

export class GeneralCountriesService extends BaseService {
  constructor() {
    super(userManagementApiClient);
  }

  async getAvailableCountries(): Promise<ApiResponse<Country[]>> {
    return (await this.apiClient.get("/general/countries")).data;
  }
}
