import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { SpaceCard } from "@/components/SpaceCard";
import { CreateSpaceForm } from "@/components/CreateSpaceForm";
import { DeleteAccountButton } from "@/components/DeleteAccountButton";
import { ExportAllData } from "@/components/ExportAllData";
import { DashboardShell } from "@/components/DashboardShell";
import { DashboardEmpty } from "@/components/DashboardEmpty";
import { DashboardAccountSection } from "@/components/DashboardAccountSection";
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
    <DashboardShell>
      <CreateSpaceForm />

      {spaces && spaces.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 mt-8">
          {spaces.map((space: Space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <DashboardEmpty />
      )}

      <DashboardAccountSection>
        <ExportAllData />
        <DeleteAccountButton />
      </DashboardAccountSection>
    </DashboardShell>
  );
}
