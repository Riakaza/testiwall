"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/lib/types";

export function TestimonialManager({
  testimonials,
  spaceId,
}: {
  testimonials: Testimonial[];
  spaceId: string;
}) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const router = useRouter();

  const verified = testimonials.filter((t) => t.status !== "unverified");
  const filtered = verified.filter(
    (t) => filter === "all" || t.status === filter
  );

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
      <h3 className="text-lg font-bold text-gray-900 mb-5">Témoignages</h3>

      <div className="flex gap-2 mb-6 flex-wrap">
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
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-400">Aucun témoignage dans cette catégorie.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((t) => (
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

                <span
                  className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${
                    t.status === "approved"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : t.status === "rejected"
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {t.status === "approved" ? "Approuvé" : t.status === "rejected" ? "Rejeté" : "En attente"}
                </span>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
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
