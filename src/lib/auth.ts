import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { sendOtpEmail } from "@/lib/email";

const SECRET_KEY = process.env.JWT_SECRET || "default-secret-key-change-me";
const key = new TextEncoder().encode(SECRET_KEY);
export const ADMIN_EMAIL = "aymaneharty@gmail.com";

let inMemoryPasswordOverride: string | null = null;

export async function getAdminPassword(): Promise<string> {
  if (inMemoryPasswordOverride) return inMemoryPasswordOverride;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase.from("settings").select("value").eq("key", "admin_password").single();
      if (data?.value) return data.value;
    } catch {
      // Ignore if table doesn't exist
    }
  }

  return process.env.ADMIN_PASSWORD || "admin123";
}

export async function setAdminPassword(newPassword: string): Promise<boolean> {
  inMemoryPasswordOverride = newPassword;

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("settings").upsert({ key: "admin_password", value: newPassword }, { onConflict: "key" });
    } catch (err) {
      console.warn("Could not save password to Supabase settings table:", err);
    }
  }

  return true;
}

export async function signSession(payload: any, expiresIn: string = "24h") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await verifySession(session);
}

export async function requestLoginOtp(password: string) {
  const currentPassword = await getAdminPassword();

  if (password !== currentPassword) {
    return { success: false, error: "Invalid password" };
  }

  // Generate 6-digit random code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Create temporary OTP token valid for 10 minutes
  const otpToken = await signSession({ role: "pending_otp", code, purpose: "login" }, "10m");

  // Send email to admin
  await sendOtpEmail(ADMIN_EMAIL, code, "login");

  return {
    success: true,
    step: "otp_required",
    otpToken,
    email: ADMIN_EMAIL,
    maskedEmail: "aymaneharty@gmail.com",
  };
}

export async function verifyLoginOtp(otpToken: string, userCode: string) {
  const payload = await verifySession(otpToken);
  if (!payload || payload.role !== "pending_otp" || payload.purpose !== "login") {
    return { success: false, error: "Verification session expired. Please log in again." };
  }

  if (payload.code !== userCode.trim()) {
    return { success: false, error: "Invalid verification code. Please check your email." };
  }

  // Create full 24h session
  const sessionToken = await signSession({ role: "admin" });

  const cookieStore = await cookies();
  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return { success: true };
}

export async function requestPasswordResetOtp() {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const resetToken = await signSession({ role: "pending_password_reset", code }, "10m");

  await sendOtpEmail(ADMIN_EMAIL, code, "password_reset");

  return {
    success: true,
    resetToken,
    email: ADMIN_EMAIL,
  };
}

export async function confirmPasswordReset(resetToken: string, userCode: string, newPassword: string) {
  const payload = await verifySession(resetToken);
  if (!payload || payload.role !== "pending_password_reset") {
    return { success: false, error: "Reset verification session expired." };
  }

  if (payload.code !== userCode.trim()) {
    return { success: false, error: "Invalid verification code." };
  }

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }

  await setAdminPassword(newPassword);
  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
