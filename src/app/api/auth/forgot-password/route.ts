import { requestPasswordResetOtp, confirmPasswordReset } from "@/lib/auth";
import { NextResponse } from "next/server";

// Unauthenticated password reset — accessible from the login page
export async function POST(request: Request) {
  try {
    const { action, resetToken, code, newPassword } = await request.json();

    if (action === "request_otp") {
      // Send OTP to admin email without requiring a session
      const result = await requestPasswordResetOtp();
      return NextResponse.json(result);
    }

    if (action === "confirm_reset") {
      if (!code || !newPassword) {
        return NextResponse.json({ error: "Code and new password are required" }, { status: 400 });
      }
      const result = await confirmPasswordReset(resetToken, code, newPassword);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, message: "Password successfully updated!" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Password reset failed" }, { status: 500 });
  }
}
