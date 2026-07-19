"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

export function ExportAllData() {
  const [isLoading, setIsLoading] = useState(false);

  const exportData = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: spaces } = await supabase
        .from("spaces")
        .select("id, name")
        .eq("user_id", user.id);

      if (!spaces || spaces.length === 0) {
        alert("Aucune donnée à exporter.");
        setIsLoading(false);
        return;
      }

      const allRows: string[] = [];
      const headers = ["Espace", "Nom", "Email", "Titre", "Contenu", "Note", "Statut", "Vérifié", "Date"];
      allRows.push(headers.join(","));

      for (const space of spaces) {
        const { data: testimonials } = await supabase
          .from("testimonials")
          .select("*")
          .eq("space_id", space.id);

        if (testimonials) {
          for (const t of testimonials) {
            allRows.push([
              `"${space.name.replace(/"/g, '""')}"`,
              `"${t.author_name.replace(/"/g, '""')}"`,
              `"${t.author_email.replace(/"/g, '""')}"`,
              `"${(t.author_title || "").replace(/"/g, '""')}"`,
              `"${t.content.replace(/"/g, '""')}"`,
              t.rating,
              t.status,
              t.email_verified ? "Oui" : "Non",
              new Date(t.created_at).toLocaleDateString("fr-FR"),
            ].join(","));
          }
        }
      }

      const blob = new Blob(["﻿" + allRows.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "testiwall-mes-donnees.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Erreur lors de l'exportation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={exportData}
      disabled={isLoading}
      className="inline-flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-accent/40 hover:text-accent transition-colors disabled:opacity-50"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {isLoading ? "Exportation..." : "Exporter toutes mes données"}
    </button>
  );
}
