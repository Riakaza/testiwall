"use client";

import { useState } from "react";

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
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/testimonials/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        space_id: spaceId,
        author_name: name.trim(),
        author_email: email.trim(),
        author_title: title.trim() || null,
        content: content.trim(),
        rating,
        website,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8 animate-scale-in">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-900">Vérifie ta boîte mail !</p>
        <p className="text-sm text-gray-500 mt-2">
          Un email de confirmation a été envoyé à <strong>{email}</strong>.<br />
          Clique sur le lien pour valider ton témoignage.
        </p>
        <p className="text-xs text-gray-400 mt-3">
          Tu ne le vois pas ? Vérifie ton dossier spam ou indésirables.
        </p>
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

      {/* Honeypot — invisible to users, bots fill it */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-accent"
        />
        <label htmlFor="consent" className="text-xs text-gray-500">
          J&apos;autorise l&apos;utilisation publique de ce témoignage sur le site du propriétaire.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || !consent}
        className="w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20 text-sm"
      >
        {loading ? "Traitement en cours..." : "Envoyer mon témoignage"}
      </button>
    </form>
  );
}
