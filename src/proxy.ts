import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "default-secret-key-change-me";
const key = new TextEncoder().encode(SECRET_KEY);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /admin/login to /admin if already logged in
  if (pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value;
    const session = token ? await verifyToken(token) : null;
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;
    const session = token ? await verifyToken(token) : null;

    if (!session) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      // Clear any stale cookie
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
