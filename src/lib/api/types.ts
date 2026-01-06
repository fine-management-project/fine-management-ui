import { AxiosError } from "axios";

export type ApiError = {
  message: string;
  statusCode: number;
};

export type ApiResponse<T> = {
  data: T;
};

export type ApiPaginatedResponse<T> = {
  data: T;
  total: number;
};

export type PaginationOptions = {
  limit?: number;
  offset?: number;
};

export type PagePaginationOptions = {
  pageIndex: number;
  pageSize: number;
};

export enum SortingDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type SortingOptions<T extends string> = {
  key: T;
  direction: SortingDirection;
};

export type PaginatedPageData<T> = {
  error?: AxiosError<ApiError>;
  data: T | null;
  total: number | null;
  defaultOffset: number;
  defaultLimit: number;
};

export type PageData<T> = {
  error?: AxiosError<ApiError>;
  data: T | null;
};
