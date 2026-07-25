"use client";

import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n-context";

export function LogoutButton() {
  const router = useRouter();
  const { t } = useTranslation();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all"
    >
      {t("dashboard.logout")}
    </button>
  );
}
