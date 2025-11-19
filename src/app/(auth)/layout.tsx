import AppHeader from "@/components/AppHeader/AppHeader";
import AppSideBar from "@/components/AppSideBar/AppSideBar";
import { createServerSession } from "@/lib/session/server";

type Props = {
  children: React.ReactNode;
};

const AuthenticatedLayout = async ({ children }: Props) => {
  const session = await createServerSession();

  return (
    <>
      <AppHeader isAuthenticated={session.hasToken()} />
      <div className="relative flex h-full p-9 w-full">
        <AppSideBar />

        <div className="flex-grow-1 flex-wrap">{children}</div>
      </div>
    </>
  );
};

export default AuthenticatedLayout;
