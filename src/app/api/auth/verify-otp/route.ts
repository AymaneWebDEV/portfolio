import { verifyLoginOtp } from "@/lib/auth";
import { NextResponse } from "next/server";

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

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
