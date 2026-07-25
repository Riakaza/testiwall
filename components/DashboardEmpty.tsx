"use client";

import { useTranslation } from "@/lib/i18n-context";

export function DashboardEmpty() {
  const { t } = useTranslation();

  return (
    <div className="mt-12 text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
      <div className="text-4xl mb-3">+</div>
      <p className="text-gray-500 font-medium">
        {t("dashboard.createFirstSpace")}
      </p>
    </div>
  );
}
