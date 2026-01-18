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
  unauthenticated = "unauthenticated",
  emailVerification = "email-verification",
  changeEmail = "change-email",
  forgotPassword = "forgot-password",
  payForFine = "pay-for-fine",
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
    url: `/users/:id/fines`,
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
    url: "/auth/sign-up",
    authProtected: false,
  },
  [RoutesId.forgotPassword]: {
    id: RoutesId.forgotPassword,
    label: "Forgot password",
    url: "/auth/forgot-password",
    authProtected: false,
  },
  [RoutesId.home]: {
    id: RoutesId.home,
    label: "Home",
    url: "/",
    authProtected: false,
  },
  [RoutesId.unauthenticated]: {
    id: RoutesId.unauthenticated,
    label: "Unauthenticated",
    url: "/unauthenticated",
    authProtected: false,
  },
  [RoutesId.emailVerification]: {
    id: RoutesId.emailVerification,
    label: "Email verification",
    url: "/email-verification",
    authProtected: true,
  },
  [RoutesId.changeEmail]: {
    id: RoutesId.changeEmail,
    label: "Change email",
    url: "/change-email",
    authProtected: true,
  },
  [RoutesId.payForFine]: {
    id: RoutesId.payForFine,
    label: "Pay for fine",
    url: "/users/:id/fines/:fineId/pay",
    authProtected: true,
  },
};
