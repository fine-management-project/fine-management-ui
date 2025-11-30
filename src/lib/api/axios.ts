import axios from "axios";

export const createApiClient = (baseUrl: string) => {
  const apiClient = axios.create({
    baseURL: baseUrl,
  });

  return apiClient;
};

export const userManagementApiClient = createApiClient(
  process.env.NEXT_PUBLIC_USER_MANAGEMENT_SERVICE_API_URL!
);
