"use client";

import { useState } from "react";
import { ShieldCheck, Mail, KeyRound, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

export default function AdminSecurityPage() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [demoCode, setDemoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request_otp" }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResetToken(data.resetToken);
        setDemoCode(data.demoCode);
        setStep("verify");
      } else {
        setError(data.error || "Failed to generate verification code");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "confirm_reset",
          resetToken,
          code,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg("Admin password successfully updated!");
        setStep("request");
        setNewPassword("");
        setConfirmPassword("");
        setCode("");
      } else {
        setError(data.error || "Invalid verification code");
      }
    } catch {
      setError("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Security & Password</h1>
        <p className="text-muted-foreground mt-1">
          Update your admin master password with 2FA email verification.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base">Two-Factor Protected Password Reset</h3>
            <p className="text-xs text-muted-foreground">Verification codes are sent to <strong className="text-foreground">aymaneharty@gmail.com</strong></p>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {step === "request" ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                New Admin Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password..."
                className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password..."
                className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-sm"
              />
            </div>

            {error && <p className="text-xs text-red-500 bg-red-500/10 p-2.5 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Verification Code to Email <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        ) : (
          <form onSubmit={handleConfirmReset} className="space-y-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 flex items-center justify-between">
              <span>Verification Code Sent to Email:</span>
              <span className="font-mono font-bold text-sm bg-blue-500/20 px-2 py-0.5 rounded text-foreground">{demoCode}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Enter 6-Digit Email Verification Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="123456"
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-center font-mono text-xl tracking-widest"
              />
            </div>

            {error && <p className="text-xs text-red-500 bg-red-500/10 p-2.5 rounded-lg">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("request")}
                className="px-4 py-2.5 rounded-xl border border-border text-sm hover:bg-muted font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Confirm & Save New Password <KeyRound className="w-4 h-4" /></>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
