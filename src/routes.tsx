import { HomeIcon, ReceiptIcon, UserIcon, UsersIcon } from "lucide-react";

type RouteConfigItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  url: string;
  authProtected: boolean;
};

export enum RoutesId {
  dashboard = "dashboard",
  users = "users",
  profile = "profile",
  fines = "fines",
  signIn = "sign-in",
  signUp = "sign-up",
  home = "home",
}

export const ROUTES: Record<RoutesId, RouteConfigItem> = {
  [RoutesId.dashboard]: {
    id: RoutesId.dashboard,
    label: "Dashboard",
    icon: <HomeIcon />,
    url: "/dashboard",
    authProtected: true,
  },
  [RoutesId.fines]: {
    id: RoutesId.fines,
    label: "Fines",
    icon: <ReceiptIcon />,
    url: `/user/:id/fines`,
    authProtected: true,
  },
  [RoutesId.profile]: {
    id: RoutesId.profile,
    label: "Profile",
    icon: <UserIcon />,
    url: `/users/:id`,
    authProtected: true,
  },
  [RoutesId.users]: {
    id: RoutesId.users,
    label: "Users",
    icon: <UsersIcon />,
    url: "/users",
    authProtected: true,
  },
  [RoutesId.signIn]: {
    id: RoutesId.signIn,
    label: "Sign In",
    url: "/auth/sign-in",
    authProtected: false,
  },
  [RoutesId.signUp]: {
    id: RoutesId.signUp,
    label: "Sign Up",
    icon: <UsersIcon />,
    url: "/auth/sign-up",
    authProtected: false,
  },
  [RoutesId.home]: {
    id: RoutesId.home,
    label: "Home",
    url: "/",
    authProtected: false,
  },
};
