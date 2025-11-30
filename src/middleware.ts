import { NextRequest, NextResponse } from "next/server";
import { ROUTES, RoutesId } from "./routes";
import { createServerSession } from "./lib/session/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await createServerSession();
  const userId = session.getUserId();
  const hasToken = session.hasToken();

  if (
    [
      ROUTES[RoutesId.signIn].url,
      ROUTES[RoutesId.signUp].url,
      ROUTES[RoutesId.unauthenticated].url,
    ].includes(pathname) &&
    hasToken &&
    !!userId
  ) {
    return NextResponse.redirect(
      new URL(ROUTES[RoutesId.profile].url.replace(":id", userId), request.url)
    );
  }

  if (
    Object.values(ROUTES).some(
      (route) => pathname.includes(route.url) && route.authProtected
    ) &&
    !hasToken
  ) {
    const signInUrl = new URL("/auth/sign-in", request.url);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
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
