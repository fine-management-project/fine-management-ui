import { Dispatch, SetStateAction } from "react";

export type UsersFilters = {
  searchTerm?: string;
};

export type UserPageContextState = {
  filters: UsersFilters;
  setFilters: Dispatch<SetStateAction<UsersFilters>>;
};
