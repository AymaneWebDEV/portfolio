import { verifyLoginOtp } from "@/lib/auth";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "default-secret-key-change-me";
const key = new TextEncoder().encode(SECRET_KEY);
const ADMIN_EMAIL = "aymaneharty@gmail.com";

export async function POST(request: Request) {
  try {
    const { otpToken, code } = await request.json();

    if (!otpToken || !code) {
      return NextResponse.json({ error: "Verification code and token are required" }, { status: 400 });
    }

    const result = await verifyLoginOtp(otpToken, code);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Build session token
    const sessionToken = await new SignJWT({ role: "admin", email: ADMIN_EMAIL })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(key);

    // Set cookie directly on the response object — the only reliable way in Next.js Route Handlers
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
