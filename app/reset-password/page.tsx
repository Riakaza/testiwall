"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setHasSession(!!user);
    }
    checkSession();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(
        error.message.toLowerCase().includes("session")
          ? "Lien expiré ou invalide. Refais une demande de réinitialisation."
          : error.message
      );
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
    setTimeout(() => router.push("/dashboard"), 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <div className="w-full max-w-sm animate-scale-in">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight inline-block">
            <span className="text-accent">Testi</span>Wall
          </Link>
          <p className="mt-2 text-gray-500">Nouveau mot de passe</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          {hasSession === false ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-2">Lien invalide ou expiré</p>
              <p className="text-sm text-gray-500 mb-6">Ce lien de réinitialisation a déjà été utilisé ou a expiré.</p>
              <Link
                href="/forgot-password"
                className="inline-block w-full py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark transition-all shadow-md shadow-accent/20"
              >
                Refaire une demande
              </Link>
            </div>
          ) : done ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-2">Mot de passe mis à jour !</p>
              <p className="text-sm text-gray-500">Redirection vers ton dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
                  placeholder="6 caractères minimum"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
                  placeholder="Retape ton mot de passe"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || hasSession === null}
                className="w-full py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20"
              >
                {loading ? "Mise à jour..." : "Changer mon mot de passe"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
