import AppHeader from "@/components/AppHeader/AppHeader";
import AppSideBar from "@/components/AppSideBar/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth0 } from "@/lib/auth0";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import { CSSProperties } from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await auth0.getSession();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as CSSProperties
      }
      className="block"
      defaultOpen={false}
    >
      <Auth0Provider>
        <AppHeader isAuthenticated={!!session} />
        <main>
          <div className="relative flex h-full p-9 w-full">
            <AppSideBar />

            <div className="flex-grow-1 flex-wrap">{children}</div>
          </div>
        </main>
      </Auth0Provider>
    </SidebarProvider>
  );
};

export default DashboardLayout;
