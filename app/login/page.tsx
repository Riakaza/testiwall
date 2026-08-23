"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setError(t("login.emailNotVerified"));
        setUnconfirmedEmail(email);
      } else {
        setError(error.message);
      }
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleResend() {
    if (!unconfirmedEmail) return;
    setResending(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: unconfirmedEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setResending(false);
    if (error) {
      if (
        error.code === "over_email_send_rate_limit" ||
        error.message.toLowerCase().includes("rate limit")
      ) {
        setError(t("login.resendRateLimited"));
      } else {
        setError(error.message);
      }
    } else {
      setResent(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors text-sm">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        {t("general.back")}
      </Link>
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-sm animate-scale-in">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight inline-block">
            <span className="text-accent">Testi</span>Wall
          </Link>
          <p className="mt-2 text-gray-500">{t("login.title")}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t("login.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t("login.password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.57-3.38m4.538 4.538a3 3 0 114.243-4.243" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              <Link href="/forgot-password" className="text-xs text-accent hover:underline mt-1.5 inline-block">
                {t("login.forgotPassword")}
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {unconfirmedEmail && !resent && (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="w-full py-2.5 bg-white text-accent border border-accent/40 rounded-lg font-medium hover:bg-accent/5 disabled:opacity-50 transition-all"
              >
                {resending ? t("login.resending") : t("login.resendVerification")}
              </button>
            )}
            {resent && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2.5">
                <p className="text-emerald-700 text-sm">{t("login.resendSent")}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20"
            >
              {loading ? t("login.loading") : t("login.submit")}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          {t("login.noAccount")}{" "}
          <Link href="/signup" className="text-accent font-medium hover:underline">
            {t("login.createAccount")}
          </Link>
        </p>
      </div>
    </div>
  );
}
