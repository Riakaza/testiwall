"use client";

import type { Testimonial } from "@/lib/types";

export function ExportCSV({ testimonials, spaceName }: { testimonials: Testimonial[]; spaceName: string }) {
  function handleExport() {
    const headers = ["Nom", "Email", "Titre", "Contenu", "Note", "Statut", "Vérifié", "Date"];
    const rows = testimonials.map((t) => [
      `"${t.author_name.replace(/"/g, '""')}"`,
      `"${t.author_email.replace(/"/g, '""')}"`,
      `"${(t.author_title || "").replace(/"/g, '""')}"`,
      `"${t.content.replace(/"/g, '""')}"`,
      t.rating,
      t.status,
      t.email_verified ? "Oui" : "Non",
      new Date(t.created_at).toLocaleDateString("fr-FR"),
    ]);

    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob(["﻿" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `testiwall-${spaceName}-export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-accent/40 hover:text-accent transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Exporter en CSV
    </button>
  );
}
