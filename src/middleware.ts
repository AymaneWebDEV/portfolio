import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const cookie = request.cookies.get("session")?.value;
    const session = cookie ? await verifySession(cookie) : null;

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect /admin/login to /admin if already logged in
  if (pathname.startsWith("/admin/login")) {
    const cookie = request.cookies.get("session")?.value;
    const session = cookie ? await verifySession(cookie) : null;

    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
