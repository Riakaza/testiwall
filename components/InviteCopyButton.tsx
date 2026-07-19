"use client";

import { useState } from "react";

export function InviteCopyButton({
  collectUrl,
  spaceName,
}: {
  collectUrl: string;
  spaceName: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `Bonjour ! J'aimerais beaucoup avoir ton retour sur ${spaceName}. Ça ne prend que 30 secondes : ${collectUrl} Merci !`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-accent/40 hover:text-accent"
    >
      {copied ? (
        <>
          <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span className="text-emerald-600 font-semibold">Copié !</span>
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <span>Copier l&apos;invitation</span>
        </>
      )}
    </button>
  );
}
