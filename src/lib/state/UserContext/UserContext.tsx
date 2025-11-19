"use client";
import { User } from "@/lib/models/user";
import { createContext, useMemo, useState } from "react";

export type UserContextProps = {
  user: User | null;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider = (
  props: React.PropsWithChildren<Partial<UserContextProps>>
) => {
  const [user, setUser] = useState<User | null>(props.user ?? null);

  const value: UserContextType = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
