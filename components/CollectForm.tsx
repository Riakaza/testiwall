"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

export function CollectForm({
  spaceId,
  thankYouMsg,
}: {
  spaceId: string;
  thankYouMsg: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: insertError } = await supabase
      .from("testimonials")
      .insert({
        space_id: spaceId,
        author_name: name.trim(),
        author_email: email.trim(),
        author_title: title.trim() || null,
        content: content.trim(),
        rating,
        status: "pending",
      });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8 animate-scale-in">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-900">{thankYouMsg}</p>
        <p className="text-sm text-gray-500 mt-2">Ton témoignage a bien été envoyé.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Ton nom <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
          placeholder="Jean Dupont"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
          placeholder="jean@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Poste / Entreprise
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="CEO chez Acme"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Note
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl transition-all hover:scale-110 ${
                star <= rating ? "text-amber-400" : "text-gray-200"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Ton témoignage <span className="text-red-400">*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          placeholder="Raconte ton expérience..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20 text-sm"
      >
        {loading ? "Envoi en cours..." : "Envoyer mon témoignage"}
      </button>
    </form>
  );
}
