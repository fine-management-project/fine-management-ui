"use client";
import AppHeader from "@/components/AppHeader/AppHeader";
import { Session } from "@/lib/session/Session";
import { SessionContext } from "@/lib/session/SessionContext";
import { useContext, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const UnauthenticatedLayout = ({ children }: Props) => {
  const { setSession } = useContext(SessionContext);

  useEffect(() => {
    setSession(new Session());
  }, [setSession]);

  return (
    <div className="h-full">
      <AppHeader isAuthenticated={false} />
      <div className="relative flex h-full p-9 w-full">
        <div className="flex flex-grow-1 flex-wrap justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UnauthenticatedLayout;
