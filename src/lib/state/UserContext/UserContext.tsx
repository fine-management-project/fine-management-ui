"use client";
import { RoleOptions } from "@/lib/models/role";
import { User } from "@/lib/models/user";
import { createContext, useMemo, useState } from "react";

export type UserContextProps = {
  user: User | null;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isCurrentUserAdmin: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isCurrentUserAdmin: false,
});

export const UserContextProvider = (
  props: React.PropsWithChildren<Partial<UserContextProps>>
) => {
  const [user, setUser] = useState<User | null>(props.user ?? null);
  const isCurrentUserAdmin =
    !!user && !!user?.roles.find((role) => role.name === RoleOptions.admin);

  const value: UserContextType = useMemo(
    () => ({
      user,
      setUser,
      isCurrentUserAdmin,
    }),
    [isCurrentUserAdmin, user]
  );

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
