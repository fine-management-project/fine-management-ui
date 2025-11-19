import { AxiosInstance } from "axios";
import { Session } from "../session/Session";

export abstract class BaseService {
  protected apiClient: AxiosInstance;
  protected session: Session;

  constructor(apiClient: AxiosInstance, session?: Session) {
    this.apiClient = apiClient;

    const newSession = session ?? new Session();
    this.session = newSession;
    this.setDefaultHeaders(newSession);
  }

  protected updateSession(newSession: Session) {
    this.session = newSession;
    this.setDefaultHeaders(newSession);
  }

  private setDefaultHeaders(session: Session) {
    this.apiClient.defaults.headers.common.Authorization = `Bearer ${session.getToken()}`;
  }
}
