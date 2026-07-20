"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/lib/types";

export function TestimonialManager({
  testimonials,
  spaceId,
  spaceSlug,
}: {
  testimonials: Testimonial[];
  spaceId: string;
  spaceSlug: string;
}) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [sort, setSort] = useState<"recent" | "oldest" | "rating">("recent");
  const [shareOpenId, setShareOpenId] = useState<string | null>(null);
  const router = useRouter();

  const verified = testimonials.filter((t) => t.status !== "unverified");
  const filtered = verified.filter(
    (t) => filter === "all" || t.status === filter
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  async function updateStatus(id: string, status: string) {
    const supabase = createClient();
    await supabase.from("testimonials").update({ status }).eq("id", id);
    router.refresh();
  }

  async function deleteTestimonial(id: string) {
    const supabase = createClient();
    await supabase.from("testimonials").delete().eq("id", id);
    router.refresh();
  }

  const counts = {
    all: verified.length,
    pending: verified.filter((t) => t.status === "pending").length,
    approved: verified.filter((t) => t.status === "approved").length,
    rejected: verified.filter((t) => t.status === "rejected").length,
  };

  const filterLabels = {
    all: "Tous",
    pending: "En attente",
    approved: "Approuvés",
    rejected: "Rejetés",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">Témoignages</h3>
      </div>


      <div className="flex flex-wrap items-center gap-2 mb-6">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? "bg-accent text-white shadow-md shadow-accent/20"
                : "bg-white text-gray-600 border border-gray-200 hover:border-accent/40 hover:text-accent"
            }`}
          >
            {filterLabels[f]} ({counts[f]})
          </button>
        ))}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "recent" | "oldest" | "rating")}
          className="ml-auto px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 bg-white"
        >
          <option value="recent">Plus récents</option>
          <option value="oldest">Plus anciens</option>
          <option value="rating">Meilleure note</option>
        </select>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-400">Aucun témoignage dans cette catégorie.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < t.rating ? "text-amber-400" : "text-gray-200"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-800 leading-relaxed">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center">
                      <span className="text-accent text-xs font-bold">
                        {t.author_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                        {t.author_name}
                        {t.email_verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-1.065-1.065 3 3 0 01-5.304 0 3 3 0 00-1.065 1.065 3 3 0 010 5.304 3 3 0 001.065 1.065 3 3 0 015.304 0 3 3 0 001.065-1.065zM12.44 10.56a.75.75 0 00-1.06-1.06l-2.25 2.25a.75.75 0 000 1.06l1.125 1.125a.75.75 0 001.06 0l3.375-3.375a.75.75 0 00-1.06-1.06l-2.845 2.845-.595-.595 2.25-2.19z" clipRule="evenodd" /></svg>
                            vérifié
                          </span>
                        )}
                      </p>
                      {t.author_title && (
                        <p className="text-xs text-gray-500">{t.author_title}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      t.status === "approved"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : t.status === "rejected"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {t.status === "approved" ? "Approuvé" : t.status === "rejected" ? "Rejeté" : "En attente"}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {new Date(t.created_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                {t.status !== "approved" && (
                  <button
                    onClick={() => updateStatus(t.id, "approved")}
                    className="text-xs px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium hover:bg-emerald-100 transition-colors border border-emerald-200"
                  >
                    Approuver
                  </button>
                )}
                {t.status !== "rejected" && (
                  <button
                    onClick={() => updateStatus(t.id, "rejected")}
                    className="text-xs px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors border border-red-200"
                  >
                    Rejeter
                  </button>
                )}
                {t.status === "approved" && (
                  <div className="relative">
                    <button
                      onClick={() => setShareOpenId(shareOpenId === t.id ? null : t.id)}
                      className="text-xs px-4 py-2 bg-gray-50 text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-colors border border-gray-200 inline-flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l5.566-3.18a2.25 2.25 0 11.233 1.977l-5.566 3.181m0 0l5.566 3.18a2.25 2.25 0 10.233 1.977l-5.566-3.18" />
                      </svg>
                      Partager
                    </button>
                    {shareOpenId === t.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShareOpenId(null)} />
                        <div className="absolute left-0 bottom-full mb-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-20">
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                              `"${t.content}" — ${t.author_name} ⭐\n\nCollecte tes témoignages gratuitement sur TestiWall`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShareOpenId(null)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Twitter
                          </a>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                              typeof window !== "undefined"
                                ? `${window.location.origin}/p/${spaceSlug}`
                                : ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShareOpenId(null)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            LinkedIn
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                )}
                <button
                  onClick={() => deleteTestimonial(t.id)}
                  className="text-xs px-4 py-2 bg-gray-50 text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-colors border border-gray-200 ml-auto"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
