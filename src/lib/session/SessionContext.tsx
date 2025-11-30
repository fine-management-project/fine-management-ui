"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { Session } from "./Session";

export type SessionContextProps = {
  session: Session;
};

export type SessionContextValues = {
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
};

export const SessionContext = createContext<SessionContextValues>({
  session: new Session(),
  setSession: () => {},
});

export const SessionContextProvider = (
  props: React.PropsWithChildren<Partial<SessionContextProps>>
) => {
  const [session, setSession] = useState<Session>(
    props.session ?? new Session()
  );

  const value: SessionContextValues = useMemo(
    () => ({
      session,
      setSession,
    }),
    [session]
  );

  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  );
};
