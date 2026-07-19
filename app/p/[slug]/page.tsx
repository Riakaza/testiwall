import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import type { Testimonial } from "@/lib/types";

export default async function WallOfLovePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: space } = await supabase
    .from("spaces")
    .select("id, name, slug")
    .eq("slug", slug)
    .single();

  if (!space) notFound();

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("space_id", space.id)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  const typedTestimonials = (testimonials as Testimonial[]) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-indigo-50/20">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Wall of Love
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            {space.name}
          </h1>
          <p className="text-gray-500 text-lg">
            {typedTestimonials.length} témoignage{typedTestimonials.length > 1 ? "s" : ""} partagé{typedTestimonials.length > 1 ? "s" : ""}
          </p>
        </header>

        {typedTestimonials.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pas encore de témoignage</h3>
            <p className="text-gray-500 text-sm">
              Il n&apos;y a pour l&apos;instant aucun témoignage approuvé. Revenez plus tard !
            </p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {typedTestimonials.map((t) => (
              <div
                key={t.id}
                className="break-inside-avoid bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < t.rating ? "text-amber-400" : "text-gray-200"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed text-base mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-purple-500 text-white font-bold flex items-center justify-center text-sm">
                    {t.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-gray-900 text-sm">
                        {t.author_name}
                      </span>
                      {t.email_verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"/>
                          </svg>
                          Vérifié
                        </span>
                      )}
                    </div>
                    {t.author_title && (
                      <span className="text-gray-500 text-xs">{t.author_title}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="w-full border-t border-gray-100 py-8 text-center">
        <a
          href="https://testiwall-kappa.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-accent transition-colors"
        >
          Propulsé par <span className="font-semibold text-gray-600 hover:text-accent">TestiWall</span>
        </a>
      </footer>
    </div>
  );
}
