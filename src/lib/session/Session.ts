import Cookies from "js-cookie";

export const TOKEN_SLUG = "access_token";
export const USER_ID_SLUG = "user_id";

export class Session {
  private _token: string | null = null;
  private _userId: string | null = null;

  constructor(token?: string, userId?: string) {
    if (token) {
      this._token = token;
    } else {
      this._token = Cookies.get(TOKEN_SLUG) ?? null;
    }

    if (userId) {
      this._userId = userId;
    } else {
      this._userId = Cookies.get(USER_ID_SLUG) ?? null;
    }
  }

  getToken() {
    return (this._token = Cookies.get(TOKEN_SLUG) ?? this._token);
  }

  setToken(token: string | null) {
    if (token) {
      this._token = token;
      Cookies.set(TOKEN_SLUG, token);
    }
  }

  getUserId() {
    return (this._userId = Cookies.get(USER_ID_SLUG) ?? this._userId);
  }

  setUserId(userId: string | null) {
    if (userId) {
      this._userId = userId;
      Cookies.set(USER_ID_SLUG, userId);
    }
  }

  hasUserId() {
    return !!this._userId;
  }

  hasToken() {
    return !!this._token;
  }

  clear() {
    this._token = null;
    Cookies.remove(TOKEN_SLUG);

    this._userId = null;
    Cookies.remove(USER_ID_SLUG);
  }
}
