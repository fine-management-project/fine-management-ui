"use client";
import AppHeader from "@/components/AppHeader/AppHeader";
import AppSideBar from "@/components/AppSideBar/AppSideBar";
import { UserService } from "@/lib/api/UserService/UserService";
import { SessionContext } from "@/lib/session/SessionContext";
import { useContext } from "react";
import { UserContextProvider } from "@/lib/state/UserContext/UserContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  children: React.ReactNode;
};

const AuthenticatedLayout = ({ children }: Props) => {
  const { session } = useContext(SessionContext);
  const userId = session.getUserId();

  const { data: user, isPending } = useQuery({
    queryKey: ["getUserById", userId],
    queryFn: async () => {
      try {
        const userService = new UserService(session);

        if (!userId) return null;

        const user = (await userService.getUserById(userId)).data;

        return user;
      } catch (e) {
        throw e;
      }
    },
    retry: false,
  });

  return (
    <>
      <AppHeader isAuthenticated={true} />
      {isPending ? (
        <Skeleton />
      ) : (
        <UserContextProvider user={user}>
          <div className="relative h-full p-9 w-full">
            <AppSideBar />

            <div className="flex-grow-1 flex-wrap">{children}</div>
          </div>
        </UserContextProvider>
      )}
    </>
  );
};

export default AuthenticatedLayout;
