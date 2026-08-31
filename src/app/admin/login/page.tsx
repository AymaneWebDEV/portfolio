"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, ArrowRight, Loader2, KeyRound, Mail, Sparkles, AlertCircle, CheckCircle2, RotateCcw, Eye, EyeOff } from "lucide-react";

type Step = "password" | "otp" | "forgot_request" | "forgot_otp" | "forgot_newpass";

export default function AdminLogin() {
  const [step, setStep] = useState<Step>("password");
  const [password, setPassword] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpToken, setOtpToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [resendMsg, setResendMsg] = useState("");

  // Forgot password states
  const [forgotOtpDigits, setForgotOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();
  const digitInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const forgotOtpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ─── Login Flow ────────────────────────────────────────────────
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
        setTimeout(() => { digitInputRefs.current[0]?.focus(); }, 150);
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpDigitChange = (index: number, value: string, refs: React.MutableRefObject<(HTMLInputElement | null)[]>, digits: string[], setDigits: (d: string[]) => void, onComplete?: (code: string) => void) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < 5) refs.current[index + 1]?.focus();
    if (value && next.every((d) => d !== "") && onComplete) {
      onComplete(next.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>, refs: React.MutableRefObject<(HTMLInputElement | null)[]>, digits: string[]) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const verifyLoginOtp = async (code: string) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ otpToken, code }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/admin";
      } else {
        setError(data.error || "Invalid verification code");
        setLoading(false);
      }
    } catch {
      setError("Verification failed");
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otpDigits.join("");
    if (code.length < 6) { setError("Please enter the full 6-digit code"); return; }
    await verifyLoginOtp(code);
  };

  const handleResendCode = async () => {
    setResending(true);
    setResendMsg("");
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok && data.step === "otp_required") {
        setOtpToken(data.otpToken);
        setResendMsg("New code sent to your email!");
      } else {
        setError("Failed to resend code.");
      }
    } catch {
      setError("Resend failed.");
    } finally {
      setResending(false);
    }
  };

  // ─── Forgot Password Flow ──────────────────────────────────────
  const handleForgotRequest = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ action: "request_otp" }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResetToken(data.resetToken || "reset_token_valid");
        setStep("forgot_otp");
        setTimeout(() => { forgotOtpRefs.current[0]?.focus(); }, 150);
      } else {
        setError(data.error || "Failed to send reset code.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyForgotOtp = (code: string) => {
    setForgotOtpDigits(code.split(""));
    setStep("forgot_newpass");
    setError("");
  };

  const handleForgotOtpSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = forgotOtpDigits.join("");
    if (code.length < 6) { setError("Please enter the full 6-digit code"); return; }
    setStep("forgot_newpass");
    setError("");
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const code = forgotOtpDigits.join("");
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ action: "confirm_reset", resetToken, code, newPassword }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg("Password updated! Redirecting to login...");
        setTimeout(() => {
          setStep("password");
          setPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setForgotOtpDigits(["", "", "", "", "", ""]);
          setSuccessMsg("");
        }, 2200);
      } else {
        setError(data.error || "Password reset failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-background text-foreground px-4 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-pink-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-[90px]" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="relative p-8 rounded-3xl border border-border/60 bg-card/70 backdrop-blur-2xl shadow-2xl shadow-purple-950/20 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

          <AnimatePresence mode="wait">

            {/* ── Step 1: Master Password ── */}
            {step === "password" && (
              <motion.div key="password-step" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 shadow-lg shadow-purple-500/25 mb-1">
                    <Lock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Portal</h1>
                    <p className="text-xs text-muted-foreground mt-1">Multi-factor security protected environment</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Master Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-4 py-3 rounded-xl bg-secondary/80 border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm transition-all pr-10 font-mono"
                      />
                      <KeyRound className="w-4 h-4 text-muted-foreground absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 transition-all overflow-hidden disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /><span>Verifying...</span></>) : (<><span>Continue to 2FA</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>)}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </form>

                {/* Forgot Password Link */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => { setError(""); setStep("forgot_request"); }}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />AES-256 Session</span>
                  <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-blue-400" />2FA OTP Protected</span>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Login OTP ── */}
            {step === "otp" && (
              <motion.div key="otp-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25 mb-1">
                    <Mail className="w-7 h-7 text-white animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">2FA Email Verification</h1>
                    <p className="text-xs text-muted-foreground mt-1">Enter the 6-digit code sent to <strong className="text-foreground font-semibold">aymaneharty@gmail.com</strong></p>
                  </div>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">6-Digit Security Code</label>
                    <div className="flex justify-center gap-2">
                      {otpDigits.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => { digitInputRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpDigitChange(i, e.target.value, digitInputRefs, otpDigits, setOtpDigits, verifyLoginOtp)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e, digitInputRefs, otpDigits)}
                          className="w-11 h-12 text-center text-xl font-mono font-bold rounded-xl bg-secondary/80 border border-border/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span>
                    </motion.div>
                  )}

                  {resendMsg && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 shrink-0" /><span>{resendMsg}</span>
                    </motion.div>
                  )}

                  <button type="submit" disabled={loading || otpDigits.join("").length < 6} className="group relative w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all overflow-hidden disabled:opacity-50">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /><span>Verifying...</span></>) : (<><ShieldCheck className="w-4 h-4" /><span>Verify & Unlock Dashboard</span></>)}
                    </span>
                  </button>
                </form>

                <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                  <button type="button" onClick={() => setStep("password")} className="text-muted-foreground hover:text-foreground transition-colors font-medium">← Back</button>
                  <button type="button" onClick={handleResendCode} disabled={resending} className="text-primary hover:underline font-semibold disabled:opacity-50">
                    {resending ? "Sending..." : "Resend Code"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Forgot — Send OTP ── */}
            {step === "forgot_request" && (
              <motion.div key="forgot-request" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 shadow-lg shadow-orange-500/25 mb-1">
                    <RotateCcw className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Reset Password</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                      A 6-digit verification code will be sent to<br />
                      <strong className="text-foreground font-semibold">aymaneharty@gmail.com</strong>
                    </p>
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span>
                  </motion.div>
                )}

                <button
                  type="button"
                  onClick={handleForgotRequest}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></>) : (<><Mail className="w-4 h-4" /><span>Send Verification Code</span></>)}
                </button>

                <div className="text-center pt-1">
                  <button type="button" onClick={() => { setError(""); setStep("password"); }} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Back to Login</button>
                </div>
              </motion.div>
            )}

            {/* ── Step 4: Forgot — Enter OTP ── */}
            {step === "forgot_otp" && (
              <motion.div key="forgot-otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 shadow-lg shadow-orange-500/25 mb-1">
                    <Mail className="w-7 h-7 text-white animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Enter Reset Code</h1>
                    <p className="text-xs text-muted-foreground mt-1">Enter the code sent to <strong className="text-foreground font-semibold">aymaneharty@gmail.com</strong></p>
                  </div>
                </div>

                <form onSubmit={handleForgotOtpSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">6-Digit Reset Code</label>
                    <div className="flex justify-center gap-2">
                      {forgotOtpDigits.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => { forgotOtpRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            if (!/^[0-9]?$/.test(e.target.value)) return;
                            const next = [...forgotOtpDigits];
                            next[i] = e.target.value;
                            setForgotOtpDigits(next);
                            if (e.target.value && i < 5) forgotOtpRefs.current[i + 1]?.focus();
                            if (e.target.value && next.every(d => d !== "")) {
                              setStep("forgot_newpass");
                              setError("");
                            }
                          }}
                          onKeyDown={(e) => { if (e.key === "Backspace" && !forgotOtpDigits[i] && i > 0) forgotOtpRefs.current[i - 1]?.focus(); }}
                          className="w-11 h-12 text-center text-xl font-mono font-bold rounded-xl bg-secondary/80 border border-border/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span>
                    </motion.div>
                  )}

                  <button type="submit" disabled={forgotOtpDigits.join("").length < 6} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4" /><span>Continue</span>
                  </button>
                </form>

                <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                  <button type="button" onClick={() => { setError(""); setStep("forgot_request"); }} className="text-muted-foreground hover:text-foreground transition-colors font-medium">← Back</button>
                  <button type="button" onClick={handleForgotRequest} disabled={loading} className="text-amber-500 hover:underline font-semibold disabled:opacity-50">
                    {loading ? "Sending..." : "Resend Code"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 5: Forgot — New Password ── */}
            {step === "forgot_newpass" && (
              <motion.div key="forgot-newpass" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25 mb-1">
                    <KeyRound className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Set New Password</h1>
                    <p className="text-xs text-muted-foreground mt-1">Choose a strong password for your admin panel</p>
                  </div>
                </div>

                {successMsg ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 shrink-0" /><span>{successMsg}</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPass ? "text" : "password"}
                          required
                          minLength={6}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Minimum 6 characters"
                          className="w-full px-4 py-3 rounded-xl bg-secondary/80 border border-border/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-sm transition-all pr-10 font-mono"
                        />
                        <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPass ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter new password"
                          className="w-full px-4 py-3 rounded-xl bg-secondary/80 border border-border/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-sm transition-all pr-10 font-mono"
                        />
                        <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-xs text-red-400 font-medium flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />Passwords do not match</p>
                    )}

                    {error && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 font-medium">
                        <AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !newPassword || !confirmPassword}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /><span>Updating...</span></>) : (<><ShieldCheck className="w-4 h-4" /><span>Update Password</span></>)}
                    </button>
                  </form>
                )}

                {!successMsg && (
                  <div className="text-center pt-1">
                    <button type="button" onClick={() => { setError(""); setStep("forgot_otp"); }} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Back</button>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
