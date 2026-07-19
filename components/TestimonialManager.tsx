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
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    author_name: "",
    author_email: "",
    author_title: "",
    content: "",
    rating: 5,
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
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

  async function handleAddTestimonial(e: React.FormEvent) {
    e.preventDefault();
    if (!addForm.author_name.trim() || !addForm.content.trim()) return;

    setAddLoading(true);
    setAddError("");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("testimonials").insert({
      space_id: spaceId,
      author_name: addForm.author_name.trim(),
      author_email: addForm.author_email.trim() || "manual@added.local",
      author_title: addForm.author_title.trim() || null,
      content: addForm.content.trim(),
      rating: addForm.rating,
      status: "approved",
      email_verified: true,
      verification_token: null,
    });

    if (insertError) {
      setAddError(insertError.message);
      setAddLoading(false);
    } else {
      setAddForm({ author_name: "", author_email: "", author_title: "", content: "", rating: 5 });
      setShowAddModal(false);
      setAddLoading(false);
      router.refresh();
    }
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
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-all shadow-md shadow-accent/20 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Ajouter un témoignage
        </button>
      </div>

      {/* Modal ajout témoignage */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-gray-900">Ajouter un témoignage</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddTestimonial} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l&apos;auteur <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addForm.author_name}
                  onChange={(e) => setAddForm({ ...addForm, author_name: e.target.value })}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-gray-400 text-xs">(optionnel)</span>
                </label>
                <input
                  type="email"
                  value={addForm.author_email}
                  onChange={(e) => setAddForm({ ...addForm, author_email: e.target.value })}
                  placeholder="jean@example.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre / Entreprise <span className="text-gray-400 text-xs">(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={addForm.author_title}
                  onChange={(e) => setAddForm({ ...addForm, author_title: e.target.value })}
                  placeholder="CEO chez Startup"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Témoignage <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={addForm.content}
                  onChange={(e) => setAddForm({ ...addForm, content: e.target.value })}
                  placeholder="Un super service, je recommande..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setAddForm({ ...addForm, rating: star })}
                      className={`text-2xl transition-colors ${
                        star <= addForm.rating ? "text-amber-400" : "text-gray-200"
                      } hover:text-amber-300`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {addError && (
                <p className="text-red-600 text-sm">{addError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="flex-1 px-4 py-2.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20 text-sm"
                >
                  {addLoading ? "Ajout..." : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
