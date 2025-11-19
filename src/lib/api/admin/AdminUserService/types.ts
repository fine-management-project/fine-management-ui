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
