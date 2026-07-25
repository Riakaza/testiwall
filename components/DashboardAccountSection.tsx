"use client";

import { useTranslation } from "@/lib/i18n-context";
import type { ReactNode } from "react";

export function DashboardAccountSection({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-4">{t("dashboard.myAccount")}</h3>
      <div className="flex flex-wrap gap-3 items-start">
        {children}
      </div>
    </div>
  );
}
