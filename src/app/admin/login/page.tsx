"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [step, setStep] = useState<"password" | "otp">("password");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok && data.step === "otp_required") {
        setOtpToken(data.otpToken);
        setStep("otp");
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ otpToken, code: otpCode }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "Invalid verification code");
      }
    } catch {
      setError("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl border border-border bg-card shadow-2xl backdrop-blur-xl">
        {step === "password" ? (
          <>
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Admin Access</h1>
              <p className="text-sm text-muted-foreground">Step 1: Enter master password</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Master Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-sm transition-all"
                />
              </div>

              {error && <p className="text-xs text-red-500 text-center font-medium bg-red-500/10 p-2.5 rounded-lg">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm shadow-md"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue to Verification <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 text-blue-500 mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Email Verification</h1>
              <p className="text-xs text-muted-foreground">
                6-digit security code sent to <strong className="text-foreground">aymaneharty@gmail.com</strong>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="123456"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-center font-mono text-xl tracking-widest transition-all"
                />
              </div>

              {error && <p className="text-xs text-red-500 text-center font-medium bg-red-500/10 p-2.5 rounded-lg">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm shadow-md"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Verify & Unlock <ShieldCheck className="w-4 h-4" /></>}
              </button>

              <button
                type="button"
                onClick={() => setStep("password")}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors pt-2 text-center"
              >
                ← Back to Password Entry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
