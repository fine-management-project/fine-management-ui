import { BaseService } from "../BaseService";
import { userManagementApiClient } from "../axios";
import {
  SignInPayload,
  SignedData,
  SignUpPayload,
  ChangeUserPasswordPayload,
} from "./types";
import { ApiResponse } from "../types";

export class AuthService extends BaseService {
  constructor() {
    super(userManagementApiClient);
  }

  async signUp(payload: SignUpPayload): Promise<ApiResponse<SignedData>> {
    return (await this.apiClient.post("/auth/sign-up", payload)).data;
  }

  async signIn(payload: SignInPayload): Promise<ApiResponse<SignedData>> {
    return (await this.apiClient.post("/auth/sign-in", payload)).data;
  }

  async signOut(refreshToken: string): Promise<void> {
    return this.apiClient.post("/auth/sign-out", {
      refreshToken,
    });
  }

  async requestForgotPassword(email: string): Promise<void> {
    return this.apiClient.post("/auth/request-forgot-password", {
      email,
    });
  }

  async changeUserPassword(payload: ChangeUserPasswordPayload): Promise<void> {
    return this.apiClient.patch("/auth/change-password", {
      ...payload,
    });
  }
}
