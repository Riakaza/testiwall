"use client";

import { useTranslation } from "@/lib/i18n-context";
import { usePathname } from "next/navigation";

export function FloatingLanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const pathname = usePathname();

  if (pathname.startsWith("/embed")) return null;

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "fr" : "en")}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:border-accent/40 transition-all"
      title={locale === "en" ? "Passer en français" : "Switch to English"}
    >
      <span className="text-base">{locale === "en" ? "🇫🇷" : "🇬🇧"}</span>
      <span className="text-gray-700">{locale === "en" ? "FR" : "EN"}</span>
    </button>
  );
}
