import axios, { AxiosInstance } from "axios";

export class APIClient {
  constructor(
    private readonly _internalAxiosInstance: AxiosInstance,
    private readonly _publicAxiosInstance: AxiosInstance
  ) {}

  private isServerSide() {
    return typeof window === "undefined";
  }

  getCorrectAxiosInstance() {
    return this.isServerSide()
      ? this._internalAxiosInstance
      : this._publicAxiosInstance;
  }
}

export const createApiInstance = (baseUrl: string) => {
  const apiInstance = axios.create({
    baseURL: baseUrl,
  });

  return apiInstance;
};

const pubicUserManagementApiInstance = createApiInstance(
  process.env.NEXT_PUBLIC_USER_MANAGEMENT_SERVICE_API_URL!
);

const internalUserManagementApiInstance = createApiInstance(
  process.env.INTERNAL_USER_MANAGEMENT_SERVICE_API_URL!
);

export const userManagementApiClient = new APIClient(
  internalUserManagementApiInstance,
  pubicUserManagementApiInstance
);

const pubicFineManagementApiInstance = createApiInstance(
  process.env.NEXT_PUBLIC_FINE_MANAGEMENT_SERVICE_API_URL!
);

const internalFineManagementApiInstance = createApiInstance(
  process.env.INTERNAL_FINE_MANAGEMENT_SERVICE_API_URL!
);

export const fineManagementApiClient = new APIClient(
  internalFineManagementApiInstance,
  pubicFineManagementApiInstance
);

const publicPaymentManagementApiInstance = createApiInstance(
  process.env.NEXT_PUBLIC_PAYMENT_MANAGEMENT_SERVICE_API_URL!
);

const internalPaymentManagementApiInstance = createApiInstance(
  process.env.INTERNAL_PAYMENT_MANAGEMENT_SERVICE_API_URL!
);

export const paymentManagementApiClient = new APIClient(
  internalPaymentManagementApiInstance,
  publicPaymentManagementApiInstance
);
