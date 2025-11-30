//----- Context -----//
"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { UserPageContextState, UsersFilters } from "./types";

export const INITIAL_USERS_FILTERS_STATE: UsersFilters = {
  searchTerm: "",
};

const UsersPageContext = createContext<UserPageContextState | null>(null);

//----- Consumer -----//

export const useUsersPageContext = (): UserPageContextState =>
  useContext(UsersPageContext) as UserPageContextState;

//----- Provider -----//

export const UsersPageProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [filters, setFilters] = useState<UsersFilters>(
    INITIAL_USERS_FILTERS_STATE
  );

  const contextValues = useMemo(
    () => ({
      filters,
      setFilters,
    }),
    [filters]
  );

  return (
    <UsersPageContext.Provider value={contextValues}>
      {props.children}
    </UsersPageContext.Provider>
  );
};
