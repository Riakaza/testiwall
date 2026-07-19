"use client";

import { useState, useRef, ChangeEvent } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

interface ParsedRow {
  author_name: string;
  author_email: string;
  author_title: string | null;
  content: string;
  rating: number;
}

export function ImportCSV({ spaceId }: { spaceId: string }) {
  const [data, setData] = useState<ParsedRow[]>([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function parseCSV(text: string): ParsedRow[] {
    const separator = text.indexOf(";") < text.indexOf("\n") && text.includes(";") ? ";" : ",";
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
    if (lines.length < 2) return [];

    const headers = lines[0].split(separator).map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ""));

    const results: ParsedRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values: string[] = [];
      let current = "";
      let inQuotes = false;

      for (const char of lines[i]) {
        if (char === '"') { inQuotes = !inQuotes; continue; }
        if (char === separator && !inQuotes) { values.push(current.trim()); current = ""; continue; }
        current += char;
      }
      values.push(current.trim());

      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => { obj[h] = values[idx] || ""; });

      const content = obj.content || obj.message || obj.testimonial || obj.avis || "";
      if (!content) continue;

      results.push({
        author_name: obj.name || obj.author_name || obj.nom || "Anonyme",
        author_email: obj.email || obj.author_email || obj.mail || "",
        author_title: obj.title || obj.author_title || obj.titre || obj.poste || null,
        content,
        rating: parseInt(obj.rating || obj.note || "5") || 5,
      });
    }
    return results;
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);
      setData(parsed);
      setFileSelected(true);
      setSuccess(false);
    };
    reader.readAsText(file);
  }

  async function handleConfirm() {
    setLoading(true);
    const supabase = createClient();
    const rows = data.map(row => ({
      space_id: spaceId,
      author_name: row.author_name,
      author_email: row.author_email || "import@csv.local",
      author_title: row.author_title,
      content: row.content,
      rating: row.rating,
      status: "approved",
      email_verified: false,
      verification_token: null,
    }));

    const { error } = await supabase.from("testimonials").insert(rows);
    setLoading(false);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      setSuccess(true);
      setFileSelected(false);
      setData([]);
      router.refresh();
    }
  }

  return (
    <div>
      {!fileSelected ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-accent/40 hover:text-accent transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Importer un CSV
          </button>
          {success && <span className="text-sm text-emerald-600 font-medium">Import réussi !</span>}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">{data.length} témoignage{data.length > 1 ? "s" : ""} détecté{data.length > 1 ? "s" : ""}</p>
            {data.slice(0, 3).map((item, i) => (
              <p key={i} className="text-sm text-gray-600 truncate">
                &ldquo;{item.content.substring(0, 60)}...&rdquo; — {item.author_name}
              </p>
            ))}
            {data.length > 3 && <p className="text-xs text-gray-400 mt-1">+ {data.length - 3} autres...</p>}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setFileSelected(false); setData([]); }}
              className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="px-4 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark disabled:opacity-50 transition-colors"
            >
              {loading ? "Importation..." : "Confirmer l'import"}
            </button>
          </div>
        </div>
      )}
      <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
    </div>
  );
}
