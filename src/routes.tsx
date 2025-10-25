import { HomeIcon, ReceiptIcon, UserIcon, UsersIcon } from "lucide-react";

type RouteConfigItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  url: string;
};

type Props = {
  id?: number;
};

export const getAvailableRoutes = ({ id }: Props): RouteConfigItem[] => {
  const userId = `/${id}`;

  return [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <HomeIcon />,
      url: "/dashboard",
    },
    {
      id: "users",
      label: "Users",
      icon: <UsersIcon />,
      url: "/users",
    },
    {
      id: "profile",
      label: "Profile",
      icon: <UserIcon />,
      url: `/user${userId}`,
    },
    {
      id: "fines",
      label: "Fines",
      icon: <ReceiptIcon />,
      url: `/user/${userId}/fines`,
    },
  ];
};
