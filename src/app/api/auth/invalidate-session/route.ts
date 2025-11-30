import { cookies } from "next/headers";
import { ROUTES, RoutesId } from "@/routes";
import { TOKEN_SLUG, USER_ID_SLUG } from "@/lib/session/Session";
import { redirect } from "next/navigation";

export async function GET() {
  (await cookies()).delete(TOKEN_SLUG);
  (await cookies()).delete(USER_ID_SLUG);

  return redirect(ROUTES[RoutesId.unauthenticated].url);
}
