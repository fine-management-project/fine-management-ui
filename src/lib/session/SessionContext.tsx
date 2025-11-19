"use client";
import { createContext, useMemo } from "react";
import { Session } from "./Session";

export type SessionContextProps = {
  session: Session;
};

export const SessionContext = createContext<SessionContextProps>({
  session: new Session(),
});

export const SessionContextProvider = (
  props: React.PropsWithChildren<Partial<SessionContextProps>>
) => {
  const value: SessionContextProps = useMemo(
    () => ({
      session: props?.session ?? new Session(),
    }),
    [props?.session]
  );

  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  );
};
