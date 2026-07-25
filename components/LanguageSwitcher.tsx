"use client";

import { useTranslation } from "@/lib/i18n-context";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "fr" : "en")}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
      title={locale === "en" ? t("lang.fr") : t("lang.en")}
    >
      <span className="text-base">{locale === "en" ? "🇫🇷" : "🇬🇧"}</span>
      <span>{locale === "en" ? "FR" : "EN"}</span>
    </button>
  );
}
