import { AxiosError, AxiosInstance } from "axios";
import { Session } from "../session/Session";
import { redirect } from "next/navigation";
import { ROUTES, RoutesId } from "@/routes";

const API_ROUTES = ["/auth/sign-in", "/auth/sign-up", "/auth/sign-out"];
export abstract class BaseService {
  protected apiClient: AxiosInstance;
  protected session: Session;

  constructor(apiClient: AxiosInstance, session?: Session) {
    this.apiClient = apiClient;

    const newSession = session ?? new Session();
    this.session = newSession;
    this.setDefaultHeaders(newSession);

    this.apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        if (
          error.status === 401 &&
          !API_ROUTES.find((routeURL) => error.config?.url === routeURL)
        ) {
          if (typeof window === "undefined") {
            redirect("/api/auth/invalidate-session");
          } else {
            this.session.clear();
            window.location.href = ROUTES[RoutesId.unauthenticated].url;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  protected updateSession(newSession: Session) {
    this.session = newSession;
    this.setDefaultHeaders(newSession);
  }

  private setDefaultHeaders(session: Session) {
    this.apiClient.defaults.headers.common.Authorization = `Bearer ${session.getToken()}`;
  }
}
