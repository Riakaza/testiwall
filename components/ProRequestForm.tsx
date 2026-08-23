"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n-context";

export function ProRequestForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    setLoading(true);
    const res = await fetch("/api/pro/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || t("pro.requestError"));
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center shadow-sm">
        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-gray-900 mb-1">{t("pro.requestSuccessTitle")}</p>
        <p className="text-sm text-gray-500">{t("pro.requestSuccessDesc")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm max-w-md mx-auto"
    >
      <h3 className="font-bold text-gray-900 text-lg mb-1">{t("pro.requestTitle")}</h3>
      <p className="text-sm text-gray-500 mb-5">{t("pro.requestDesc")}</p>

      <input type="hidden" name="website" value="" />

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("pro.requestPlaceholder")}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all focus:border-accent/50 outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20 whitespace-nowrap"
        >
          {loading ? t("pro.requestSending") : t("pro.requestSubmit")}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5 mt-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </form>
  );
}
