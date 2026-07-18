"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export function CreateSpaceForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const { error: insertError } = await supabase.from("spaces").insert({
      user_id: user.id,
      name: name.trim(),
      slug: `${slug}-${Date.now().toString(36)}`,
      question: "What do you love about working with us?",
      thank_you_msg: "Thank you for your testimonial!",
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      setName("");
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom de l'espace (ex: Mon SaaS)"
        required
        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white transition-all"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20 text-sm"
      >
        {loading ? "..." : "Créer"}
      </button>
      {error && <p className="text-red-600 text-sm self-center">{error}</p>}
    </form>
  );
}
