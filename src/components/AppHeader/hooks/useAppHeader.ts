import { AuthService } from "@/lib/api/AuthService/AuthService";
import { SessionContext } from "@/lib/session/SessionContext";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { ROUTES, RoutesId } from "@/routes";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";

export type UseAppHeader = {
  pathName: string;
  loading: boolean;
  onSignOut: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
};

export const useAppHeader = (): UseAppHeader => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const { session } = useContext(SessionContext);
  const { setUser } = useContext(UserContext);

  const onSignOut = async () => {
    try {
      const token = session.getToken();

      if (token) {
        setLoading(true);
        const authClient = new AuthService();
        await authClient.signOut(token);
      }

      setUser(null);
      session.clear();

      router.push(ROUTES[RoutesId.home].url);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const onSignIn = () => {
    router.push(ROUTES[RoutesId.signIn].url);
  };

  const onSignUp = () => {
    router.push(ROUTES[RoutesId.signUp].url);
  };

  return {
    onSignOut,
    onSignIn,
    onSignUp,
    pathName,
    loading,
  };
};
