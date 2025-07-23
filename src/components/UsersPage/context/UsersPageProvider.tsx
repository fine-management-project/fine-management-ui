//----- Context -----//
'use client'

import { createContext, useContext, useMemo, useState } from "react";
import { UserPageContextState, UsersFilters } from "./types";

const UsersPageContext = createContext<UserPageContextState | null>(null);

//----- Consumer -----//

export const useUsersPageConext = (): UserPageContextState =>
  useContext(UsersPageContext) as UserPageContextState;

//----- Provider -----//

export const UsersPageProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [filters, setFilters] = useState<UsersFilters>({
    searchTerm: ''
  });

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
