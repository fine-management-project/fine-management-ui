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

export enum SortingDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type SortingOptions<T extends string> = {
  key: T;
  direction: SortingDirection;
};
