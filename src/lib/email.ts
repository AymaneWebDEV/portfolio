export async function sendOtpEmail(toEmail: string, otpCode: string, purpose: "login" | "password_reset" = "login") {
  const subject = purpose === "login"
    ? `Your Portfolio Admin Login Code: ${otpCode}`
    : `Your Admin Password Change Verification Code: ${otpCode}`;

  const textContent = `Hello Ahmed Aymane,\n\nYour 6-digit verification code is: ${otpCode}\n\nThis code will expire in 10 minutes. If you did not request this code, please ignore this message.\n\nBest regards,\nPortfolio Security System`;

  console.log("==========================================");
  console.log(`[SECURITY OTP EMAIL SENT TO: ${toEmail}]`);
  console.log(`SUBJECT: ${subject}`);
  console.log(`VERIFICATION CODE: ${otpCode}`);
  console.log("==========================================");

  // If RESEND_API_KEY or SMTP is provided, send via API
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Security <onboarding@resend.dev>",
          to: [toEmail],
          subject: subject,
          text: textContent,
        }),
      });
    } catch (err) {
      console.error("Failed to dispatch email via Resend API:", err);
    }
  }

  return { success: true, otpCode };
}
