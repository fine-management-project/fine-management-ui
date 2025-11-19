"use client";
import Link from "next/link";
// import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { useAppHeader } from "./hooks/useAppHeader";
import { ROUTES, RoutesId } from "@/routes";
import { Spinner } from "../ui/spinner";

type Props = {
  isAuthenticated: boolean;
};

const AppHeader = ({ isAuthenticated }: Props): React.JSX.Element => {
  const { pathName, onSignIn, onSignOut, onSignUp, loading } = useAppHeader();

  return (
    <header className="w-full h-12 bg-stone-800 shadow-md items-center flex px-5 content-between">
      <div className="text-stone-100 font-bold italic grow text-lg flex">
        {isAuthenticated && <SidebarTrigger />}
        <Link className="ml-2 hover:text-purple-400" href={"/"}>
          Fine Management App UI
        </Link>
      </div>
      <div>
        {!isAuthenticated && pathName !== ROUTES[RoutesId.signIn].url && (
          <Button
            variant="link"
            className="text-stone-100 cursor-pointer"
            onClick={onSignIn}
          >
            <a>Sign In</a>
          </Button>
        )}
        {!isAuthenticated && pathName !== ROUTES[RoutesId.signUp].url && (
          <Button
            variant="link"
            className="text-stone-100 cursor-pointer"
            onClick={onSignUp}
          >
            <a>Sign Up</a>
          </Button>
        )}
        {isAuthenticated && (
          <Button
            variant="link"
            className="text-stone-100 cursor-pointer"
            onClick={onSignOut}
            disabled={loading}
          >
            {loading && <Spinner />}
            <a>Log out</a>
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
