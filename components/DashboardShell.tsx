"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n-context";
import { LogoutButton } from "./LogoutButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { ReactNode } from "react";

export function DashboardShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/20">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Testi</span>Wall
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <LogoutButton />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">{t("dashboard.mySpaces")}</h2>
          <p className="text-gray-500 mt-1">{t("dashboard.mySpacesDesc")}</p>
        </div>
        {children}
      </main>
    </div>
  );
}
