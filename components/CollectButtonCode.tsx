"use client";

import { useState } from "react";

export function CollectButtonCode({ collectUrl }: { collectUrl: string }) {
  const [copied, setCopied] = useState(false);

  const htmlCode = `<a
  href="${collectUrl}"
  target="_blank"
  rel="noopener noreferrer"
  style="background:#6366f1;color:white;padding:12px 24px;border-radius:8px;font-weight:600;font-family:sans-serif;text-decoration:none;display:inline-block;font-size:14px;"
>
  Laissez-nous votre avis ⭐
</a>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="relative bg-gray-900 text-gray-100 rounded-xl p-4 text-xs font-mono overflow-x-auto border border-gray-800">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-emerald-400">Copié !</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              <span>Copier le code</span>
            </>
          )}
        </button>
        <pre className="mt-1 leading-relaxed pr-28 select-all whitespace-pre-wrap">
          <code>{htmlCode}</code>
        </pre>
      </div>
      <p className="text-xs text-gray-500 mt-2">Colle ce code sur ta page de remerciement, ton footer, ou ta signature email.</p>
    </div>
  );
}
