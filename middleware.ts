import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Cookie presence check only; real session and role checks happen in
// requireUser()/requireAdmin() inside each route and layout.
const protectedPages = ["/portal", "/admin"];
const protectedApis = ["/api/uploads", "/api/admin"];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const hasSession = !!getSessionCookie(req);
  if (hasSession) return NextResponse.next();

  if (protectedApis.some((p) => pathname.startsWith(p))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (protectedPages.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*", "/api/uploads/:path*", "/api/admin/:path*"],
};
