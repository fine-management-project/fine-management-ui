"use client";
import { ROUTES, RoutesId } from "@/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../ui/sidebar";
import Link from "next/link";
import { useContext, useMemo } from "react";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { RoleOptions } from "@/lib/models/role";

const AppSideBar = (): React.JSX.Element => {
  const { user } = useContext(UserContext);

  const routesToShow = useMemo(() => {
    const routes = [
      ROUTES[RoutesId.dashboard],
      ROUTES[RoutesId.fines],
      ROUTES[RoutesId.profile],
    ];

    if (
      user?.roles &&
      !!user.roles.find(({ name }) => RoleOptions.admin === name)
    ) {
      routes.push(ROUTES[RoutesId.users]);
    }

    return routes.map((value) => ({
      ...value,
      url: value.url.replace(":id", user?.id ?? ""),
    }));
  }, [user]);

  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="text-stone-100 font-bold italic grow text-lg flex">
              <SidebarTrigger />
              <Link className="ml-2 hover:text-purple-400" href="/">
                Fine Management App UI
              </Link>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {routesToShow.map(({ id, label, icon, url }) => (
                <SidebarMenuItem className="my-1" key={id}>
                  <SidebarMenuButton asChild>
                    <Link className="h-10" href={url}>
                      {icon}
                      <span className="text-lg">{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
