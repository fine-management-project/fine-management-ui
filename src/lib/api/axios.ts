import axios from "axios";

export const createApiClient = (baseUrl: string) => {
  return axios.create({
    baseURL: baseUrl,
  });
};

export const userManagementApiClient = createApiClient(
  process.env.NEXT_PUBLIC_USER_MANAGEMENT_SERVICE_API_URL!
);
