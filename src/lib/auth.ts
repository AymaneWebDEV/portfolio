import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { sendOtpEmail } from "@/lib/email";

const SECRET_KEY = process.env.JWT_SECRET || "default-secret-key-change-me";
const key = new TextEncoder().encode(SECRET_KEY);
export const ADMIN_EMAIL = "aymaneharty@gmail.com";

let inMemoryPasswordOverride: string | null = null;

// ─── Supabase Persistent Password Store ──────────────────────────
export async function getAdminPassword(): Promise<string> {
  if (isSupabaseConfigured && supabase) {
    try {
      // 1. Check dedicated settings table
      const { data } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "admin_password")
        .maybeSingle();

      if (data?.value) return data.value;
    } catch {
      // Ignore if table missing
    }

    try {
      // 2. Check persistent configuration record in Supabase
      const { data } = await supabase
        .from("contacts")
        .select("message")
        .eq("subject", "__ADMIN_SETTINGS__")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data?.message) return data.message;
    } catch {
      // Ignore if record missing
    }
  }

  if (inMemoryPasswordOverride) return inMemoryPasswordOverride;

  return process.env.ADMIN_PASSWORD || "admin123";
}

export async function setAdminPassword(newPassword: string): Promise<boolean> {
  inMemoryPasswordOverride = newPassword;

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("settings")
        .upsert({ key: "admin_password", value: newPassword }, { onConflict: "key" });

      if (error) {
        // Fallback to persistent configuration record in Supabase contacts table
        const { data: existing } = await supabase
          .from("contacts")
          .select("id")
          .eq("subject", "__ADMIN_SETTINGS__")
          .maybeSingle();

        if (existing?.id) {
          await supabase
            .from("contacts")
            .update({ message: newPassword, email: "system@internal" })
            .eq("id", existing.id);
        } else {
          await supabase
            .from("contacts")
            .insert([{
              name: "System Setting",
              email: "system@internal",
              subject: "__ADMIN_SETTINGS__",
              message: newPassword
            }]);
        }
      }
    } catch (err) {
      console.warn("Could not save password to Supabase DB:", err);
    }
  }

  return true;
}

// ─── JWT Session Handling ────────────────────────────────────────
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
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return await verifySession(token);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}

// ─── 2FA OTP Store ──────────────────────────────────────────
interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

const otpStore: Record<string, OtpEntry> = {};

export function generateOTP(): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

export async function createAndSendOtp(email: string = ADMIN_EMAIL): Promise<{ success: boolean }> {
  const code = generateOTP();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  otpStore[email] = {
    code,
    expiresAt,
    attempts: 0,
  };

  const res = await sendOtpEmail(email, code);
  return { success: res.success };
}

export function verifyOTP(email: string, inputCode: string): { valid: boolean; message: string } {
  const entry = otpStore[email];

  if (!entry) {
    return { valid: false, message: "No verification code requested. Please login again." };
  }

  if (Date.now() > entry.expiresAt) {
    delete otpStore[email];
    return { valid: false, message: "Verification code has expired. Please request a new one." };
  }

  if (entry.attempts >= 5) {
    delete otpStore[email];
    return { valid: false, message: "Too many failed attempts. Please request a new code." };
  }

  if (entry.code !== inputCode.trim()) {
    entry.attempts += 1;
    return { valid: false, message: `Invalid code. ${5 - entry.attempts} attempts remaining.` };
  }

  delete otpStore[email];
  return { valid: true, message: "Verification successful!" };
}

// ─── Login & Password Reset Workflows ──────────────────────────────
export async function requestLoginOtp(passwordInput: string): Promise<{ success: boolean; otpToken?: string; error?: string }> {
  const currentPassword = await getAdminPassword();

  if (passwordInput.trim() !== currentPassword.trim()) {
    return { success: false, error: "Invalid password." };
  }

  const { success } = await createAndSendOtp(ADMIN_EMAIL);
  if (!success) {
    return { success: false, error: "Failed to dispatch verification email via Resend API." };
  }

  return { success: true, otpToken: "otp_sent" };
}

export async function verifyLoginOtp(otpToken: string, code: string): Promise<{ success: boolean; error?: string }> {
  const result = verifyOTP(ADMIN_EMAIL, code);

  if (!result.valid) {
    return { success: false, error: result.message };
  }

  const sessionToken = await signSession({ role: "admin", email: ADMIN_EMAIL });
  const cookieStore = await cookies();
  cookieStore.set("admin_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 86400,
  });

  return { success: true };
}

export async function requestPasswordResetOtp(): Promise<{ success: boolean; resetToken?: string; error?: string }> {
  const { success } = await createAndSendOtp(ADMIN_EMAIL);
  if (!success) {
    return { success: false, error: "Failed to send 2FA verification email." };
  }

  return { success: true, resetToken: "reset_token_valid" };
}

export async function confirmPasswordReset(resetToken: string, code: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "New password must be at least 6 characters long." };
  }

  const result = verifyOTP(ADMIN_EMAIL, code);
  if (!result.valid) {
    return { success: false, error: result.message };
  }

  await setAdminPassword(newPassword);
  return { success: true };
}
