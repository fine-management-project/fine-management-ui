export type GetUsersFilters = {
  blocked?: boolean;
  searchTerm?: string;
};

export type GetUsersSortingKey =
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "createdAt";

export type UpdateUserRolesPayload = {
  roleIds: string[];
};

export type UpdateUserBlockedStatusPayload = {
  blocked: boolean;
};
