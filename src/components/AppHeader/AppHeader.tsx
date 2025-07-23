import Link from "next/link";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

type Props = {
  isAuthenticated?: boolean;
};

const AppHeader = ({ isAuthenticated }: Props): React.JSX.Element => {
  return (
    <header className="w-full h-12 bg-stone-800 shadow-md items-center flex px-5 content-between">
      <div className="text-stone-100 font-bold italic grow text-lg flex">
        <SidebarTrigger />
        <Link className="ml-2 hover:text-purple-400" href={'/'}>Fine Management App UI</Link>
      </div>
      <div>
        {!isAuthenticated && (
          <Button variant="link" className="text-stone-100">
            <a href="/auth/login">Login</a>
          </Button>
        )}
        {isAuthenticated && (
          <Button variant="link" className=" text-stone-100">
            <a href="/auth/logout">Log out</a>
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
