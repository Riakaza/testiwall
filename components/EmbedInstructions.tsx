"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";

type Tab = "simple" | "iframe" | "link";

export function EmbedInstructions({ embedUrl, slug }: { embedUrl: string; slug: string }) {
  const [tab, setTab] = useState<Tab>("simple");
  const [accent, setAccent] = useState("6366f1");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const params: string[] = [];
  if (accent !== "6366f1") params.push(`accent=${accent}`);
  if (theme !== "light") params.push(`theme=${theme}`);
  const customizedEmbedUrl = params.length > 0 ? `${embedUrl}?${params.join("&")}` : embedUrl;

  const iframeCode = `<iframe src="${customizedEmbedUrl}" width="100%" height="500" frameborder="0" style="border:none;border-radius:12px;"></iframe>`;

  const colors = [
    { hex: "6366f1", label: "Indigo" },
    { hex: "e11d48", label: "Rose" },
    { hex: "10b981", label: "Émeraude" },
    { hex: "f59e0b", label: "Ambre" },
    { hex: "8b5cf6", label: "Violet" },
    { hex: "000000", label: "Noir" },
  ];

  const tabs: { id: Tab; label: string; desc: string }[] = [
    { id: "simple", label: "Copier-coller", desc: "Carrd, WordPress, Wix, Webflow..." },
    { id: "iframe", label: "iframe", desc: "HTML custom, React, Next.js..." },
    { id: "link", label: "Lien direct", desc: "Bio Twitter, Linktree, email..." },
  ];

  return (
    <div>
      {/* Personnalisation */}
      <div className="mb-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Personnaliser le widget</h4>

        <div className="flex flex-col sm:flex-row gap-5">
          {/* Thème */}
          <div>
            <span className="block text-xs font-medium text-gray-500 mb-2">Thème</span>
            <div className="inline-flex rounded-xl overflow-hidden border border-gray-200">
              <button
                onClick={() => setTheme("light")}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  theme === "light"
                    ? "bg-accent text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Clair
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  theme === "dark"
                    ? "bg-accent text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Sombre
              </button>
            </div>
          </div>

          {/* Couleur */}
          <div>
            <span className="block text-xs font-medium text-gray-500 mb-2">Couleur d&apos;accent</span>
            <div className="flex items-center gap-2">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setAccent(c.hex)}
                  title={c.label}
                  style={{ backgroundColor: `#${c.hex}` }}
                  className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all ${
                    accent === c.hex
                      ? "border-gray-900 scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Aperçu */}
        <div
          className={`rounded-xl p-4 mt-4 flex items-center justify-between transition-colors ${
            theme === "dark" ? "bg-gray-900" : "bg-white border border-gray-200"
          }`}
        >
          <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Aperçu</span>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: `#${accent}` }}
              className="w-5 h-5 rounded-full"
            />
            <span
              style={{ color: `#${accent}` }}
              className="text-sm font-semibold"
            >
              TestiWall
            </span>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-2 mb-5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-accent text-white shadow-md shadow-accent/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {tabs.find((t) => t.id === tab)?.desc}
      </p>

      {tab === "simple" && (
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-700 mb-3 font-medium">
              Colle ce code dans ton site (dans un bloc HTML/Embed) :
            </p>
            <code className="block p-3 bg-white border border-gray-200 rounded-lg text-sm break-all whitespace-pre-wrap font-mono text-gray-700">
              {iframeCode}
            </code>
            <div className="mt-4">
              <CopyButton text={iframeCode} />
            </div>
          </div>
          <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Carrd :</strong> ajoute un bloc &quot;Embed&quot; → colle le code → publie.
              <br />
              <strong>WordPress :</strong> ajoute un bloc &quot;HTML personnalisé&quot; → colle le code.
              <br />
              <strong>Wix / Webflow :</strong> ajoute un composant &quot;Embed&quot; → colle le code.
            </p>
          </div>
        </div>
      )}

      {tab === "iframe" && (
        <div className="space-y-3">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <code className="block p-3 bg-white border border-gray-200 rounded-lg text-sm break-all whitespace-pre-wrap font-mono text-gray-700">
              {iframeCode}
            </code>
            <div className="mt-4">
              <CopyButton text={iframeCode} />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Ajuste la hauteur (height) selon le nombre de témoignages.
          </p>
        </div>
      )}

      {tab === "link" && (
        <div className="space-y-3">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-700 mb-3 font-medium">
              Partage ce lien pour que les gens voient tes témoignages :
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-3 bg-white border border-gray-200 rounded-lg text-sm break-all font-mono text-gray-700">
                {customizedEmbedUrl}
              </code>
              <CopyButton text={customizedEmbedUrl} />
              <a
                href={customizedEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors"
              >
                Ouvrir
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Idéal pour une bio Twitter, un Linktree, ou un email client.
          </p>
        </div>
      )}

      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Tu ne sais pas comment intégrer un embed ?
        </p>
        <a
          href="https://www.youtube.com/results?search_query=comment+ajouter+code+embed+sur+son+site"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/>
          </svg>
          Voir des tutos sur YouTube
        </a>
      </div>
    </div>
  );
}
