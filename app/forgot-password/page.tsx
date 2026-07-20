"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <div className="w-full max-w-sm animate-scale-in">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight inline-block">
            <span className="text-accent">Testi</span>Wall
          </Link>
          <p className="mt-2 text-gray-500">Réinitialise ton mot de passe</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-2">Email envoyé !</p>
              <p className="text-sm text-gray-500">Vérifie ta boîte mail (et tes spams) pour le lien de réinitialisation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
                  placeholder="ton@email.com"
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
                className="w-full py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20"
              >
                {loading ? "Envoi..." : "Envoyer le lien"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/login" className="text-accent font-medium hover:underline">
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
