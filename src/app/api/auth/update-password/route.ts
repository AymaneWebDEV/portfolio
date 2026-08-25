import { getSession, requestPasswordResetOtp, confirmPasswordReset } from "@/lib/auth";
import { NextResponse } from "next/server";

// Request email OTP code to update password
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, resetToken, code, newPassword } = await request.json();

    if (action === "request_otp") {
      const result = await requestPasswordResetOtp();
      return NextResponse.json(result);
    }

    if (action === "confirm_reset") {
      const result = await confirmPasswordReset(resetToken, code, newPassword);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, message: "Admin password successfully updated!" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Password update failed" }, { status: 500 });
  }
}
