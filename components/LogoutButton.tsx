"use client";

import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

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
      Déconnexion
    </button>
  );
}
