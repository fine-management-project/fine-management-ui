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

const AppSideBar = (): React.JSX.Element => {
  const routsToShow = [
    ROUTES[RoutesId.dashboard],
    ROUTES[RoutesId.fines],
    ROUTES[RoutesId.profile],
    ROUTES[RoutesId.users],
  ];

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
              {routsToShow.map(({ id, label, icon, url }) => (
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
