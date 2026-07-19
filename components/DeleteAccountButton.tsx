"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteAccountButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Es-tu sûr ? Toutes tes données seront supprimées définitivement."
    );
    if (!confirmed) return;

    setIsLoading(true);

    const res = await fetch("/api/account/delete", { method: "POST" });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Erreur lors de la suppression.");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
    >
      {isLoading ? "Suppression..." : "Supprimer mon compte"}
    </button>
  );
}
