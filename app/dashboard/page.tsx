import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SpaceCard } from "@/components/SpaceCard";
import { CreateSpaceForm } from "@/components/CreateSpaceForm";
import { LogoutButton } from "@/components/LogoutButton";
import { DeleteAccountButton } from "@/components/DeleteAccountButton";
import { ExportAllData } from "@/components/ExportAllData";
import type { Space } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: spaces } = await supabase
    .from("spaces")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/20">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Testi</span>Wall
        </Link>
        <LogoutButton />
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Tes espaces</h2>
          <p className="text-gray-500 mt-1">Crée un espace pour chaque projet ou client.</p>
        </div>

        <CreateSpaceForm />

        {spaces && spaces.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 mt-8">
            {spaces.map((space: Space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="text-4xl mb-3">+</div>
            <p className="text-gray-500 font-medium">
              Crée ton premier espace ci-dessus pour commencer
            </p>
          </div>
        )}
        {/* Mon compte */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Mon compte</h3>
          <div className="flex flex-wrap gap-3 items-start">
            <ExportAllData />
            <DeleteAccountButton />
          </div>
        </div>
      </main>
    </div>
  );
}
