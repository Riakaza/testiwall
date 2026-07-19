import { createClient } from "@/lib/supabase-server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { TestimonialManager } from "@/components/TestimonialManager";
import { LogoutButton } from "@/components/LogoutButton";
import { CopyButton } from "@/components/CopyButton";
import { InviteCopyButton } from "@/components/InviteCopyButton";
import { CollectButtonCode } from "@/components/CollectButtonCode";
import { EmbedInstructions } from "@/components/EmbedInstructions";
import { ImportCSV } from "@/components/ImportCSV";
import { ExportCSV } from "@/components/ExportCSV";
import type { Testimonial } from "@/lib/types";
import { headers } from "next/headers";

export default async function SpaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: space } = await supabase
    .from("spaces")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!space) notFound();

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("space_id", space.id)
    .order("created_at", { ascending: false });

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const collectUrl = `${baseUrl}/collect/${space.slug}`;
  const embedUrl = `${baseUrl}/embed/${space.slug}`;

  const testimonialCount = testimonials?.length || 0;
  const approvedCount = testimonials?.filter((t) => t.status === "approved").length || 0;
  const pendingCount = testimonials?.filter((t) => t.status === "pending").length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/20">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight">
            <span className="text-accent">Testi</span>Wall
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-medium text-gray-700 truncate max-w-[150px] sm:max-w-none">{space.name}</span>
        </div>
        <LogoutButton />
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold tracking-tight">{testimonialCount}</p>
            <p className="text-sm text-gray-500 mt-1">Total reçus</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold tracking-tight text-emerald-600">{approvedCount}</p>
            <p className="text-sm text-gray-500 mt-1">Approuvés</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold tracking-tight text-amber-500">{pendingCount}</p>
            <p className="text-sm text-gray-500 mt-1">En attente</p>
          </div>
        </div>

        {testimonialCount === 0 ? (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Comment ça marche ?</h2>
              <p className="text-gray-500 mb-8">
                3 étapes pour collecter et afficher tes témoignages clients :
              </p>

              <div className="space-y-8">
                {/* Étape 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 bg-accent text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md shadow-accent/20">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Envoie ce lien à tes clients</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Ils verront un formulaire simple pour laisser leur témoignage.
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm break-all font-mono">
                        {collectUrl}
                      </code>
                      <CopyButton text={collectUrl} />
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <a
                        href={`/collect/${space.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:underline"
                      >
                        Voir le formulaire →
                      </a>
                      <InviteCopyButton collectUrl={collectUrl} spaceName={space.name} />
                    </div>
                  </div>
                </div>

                {/* Étape 2 */}
                <div className="flex gap-4 opacity-50">
                  <div className="flex-shrink-0 w-9 h-9 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-400">Approuve les témoignages</h3>
                    <p className="text-sm text-gray-400">
                      Quand un client soumet un témoignage, il apparaît ici. Tu choisis lesquels afficher publiquement.
                    </p>
                  </div>
                </div>

                {/* Étape 3 */}
                <div className="flex gap-4 opacity-50">
                  <div className="flex-shrink-0 w-9 h-9 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-400">Affiche-les sur ton site</h3>
                    <p className="text-sm text-gray-400">
                      Une fois que tu as des témoignages approuvés, tu pourras les afficher sur ton site en un copier-coller.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
              <p className="text-sm text-accent-dark">
                <strong>Astuce :</strong> Pour tester, ouvre le lien de collecte dans un autre onglet et soumets un témoignage toi-même. Tu peux aussi ajouter un témoignage manuellement ci-dessous.
              </p>
            </div>

            {/* Ajouter manuellement même sans témoignages existants */}
            <TestimonialManager
              testimonials={(testimonials as Testimonial[]) || []}
              spaceId={space.id}
              spaceSlug={space.slug}
            />
          </div>
        ) : (
          <>
            {/* Section liens */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-1">Lien de collecte</h3>
                <p className="text-sm text-gray-500 mb-3">Envoie ce lien à tes clients pour recevoir leurs témoignages.</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm break-all font-mono">
                    {collectUrl}
                  </code>
                  <CopyButton text={collectUrl} />
                </div>
                <div className="mt-3">
                  <InviteCopyButton collectUrl={collectUrl} spaceName={space.name} />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-1">Page publique Wall of Love</h3>
                  <p className="text-sm text-gray-500 mb-3">Partage cette page pour montrer tous tes avis en un seul endroit.</p>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm break-all font-mono">
                      {`${baseUrl}/p/${space.slug}`}
                    </code>
                    <CopyButton text={`${baseUrl}/p/${space.slug}`} />
                  </div>
                  <a
                    href={`/p/${space.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-accent text-accent rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-accent/5 transition-colors"
                  >
                    Voir le Wall of Love →
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-1">Bouton à intégrer sur ton site</h3>
                  <p className="text-sm text-gray-500 mb-3">Copie ce code HTML et colle-le où tu veux sur ton site.</p>
                  <CollectButtonCode collectUrl={collectUrl} />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">Afficher sur ton site</h3>
                <p className="text-sm text-gray-500 mb-4">Choisis la méthode qui correspond à ton site :</p>
                <EmbedInstructions embedUrl={embedUrl} slug={space.slug} />
              </div>
            </div>

            {/* Import / Export */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-1">Importer / Exporter</h3>
              <p className="text-sm text-gray-500 mb-4">Importe tes témoignages existants ou exporte tes données.</p>
              <div className="flex flex-wrap gap-3">
                <ImportCSV spaceId={space.id} />
                <ExportCSV testimonials={(testimonials as Testimonial[]) || []} spaceName={space.slug} />
              </div>
            </div>

            {/* Liste des témoignages */}
            <TestimonialManager
              testimonials={(testimonials as Testimonial[]) || []}
              spaceId={space.id}
              spaceSlug={space.slug}
            />
          </>
        )}
      </main>
    </div>
  );
}
