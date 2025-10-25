import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";
import { getAvailableRoutes } from "./routes";

export async function middleware(request: NextRequest) {
  const session = await auth0.getSession(request);
  const { pathname } = request.nextUrl;

  if (
    !session?.tokenSet.accessToken &&
    getAvailableRoutes({}).some((route) => pathname.includes(route.url))
  ) {
    const loginUrl = new URL("/auth/login", request.url);
    // Add a `returnTo` query parameter so the user can be redirected back after login
    loginUrl.searchParams.set("returnTo", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
