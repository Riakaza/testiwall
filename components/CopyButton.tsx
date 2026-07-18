"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
        copied
          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
          : "bg-accent text-white shadow-md shadow-accent/20 hover:bg-accent-dark"
      }`}
    >
      {copied ? "Copié !" : "Copier"}
    </button>
  );
}
