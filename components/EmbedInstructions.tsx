"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { useTranslation } from "@/lib/i18n-context";

type Tab = "simple" | "iframe" | "link";

export function EmbedInstructions({ embedUrl, slug }: { embedUrl: string; slug: string }) {
  const [tab, setTab] = useState<Tab>("simple");
  const [accent, setAccent] = useState("6366f1");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState("15");
  const [maxTestimonials, setMaxTestimonials] = useState("20");
  const [hideBranding, setHideBranding] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const { t } = useTranslation();

  const params: string[] = [];
  if (accent !== "6366f1") params.push(`accent=${accent}`);
  if (theme !== "light") params.push(`theme=${theme}`);
  if (fontSize !== "15") params.push(`fontSize=${fontSize}`);
  if (maxTestimonials !== "20") params.push(`max=${maxTestimonials}`);
  if (hideBranding) params.push("hideBranding=true");
  if (showSummary) params.push("showSummary=1");
  const customizedEmbedUrl = params.length > 0 ? `${embedUrl}?${params.join("&")}` : embedUrl;

  const iframeCode = `<iframe id="testiwall-widget" src="${customizedEmbedUrl}" width="100%" height="500" frameborder="0" style="border:none;border-radius:12px;overflow:hidden;"></iframe>
<script>
window.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'testiwall-height') {
    document.getElementById('testiwall-widget').style.height = e.data.height + 'px';
  }
});
</script>`;

  const colors = [
    { hex: "6366f1", label: "Indigo" },
    { hex: "3b82f6", label: "Blue" },
    { hex: "e11d48", label: "Rose" },
    { hex: "10b981", label: "Emerald" },
    { hex: "f59e0b", label: "Amber" },
    { hex: "8b5cf6", label: "Violet" },
    { hex: "000000", label: "Black" },
  ];

  const tabs: { id: Tab; label: string; desc: string }[] = [
    { id: "simple", label: t("embedInstructions.copyPaste"), desc: t("embedInstructions.copyPasteDesc") },
    { id: "iframe", label: t("embedInstructions.iframe"), desc: t("embedInstructions.iframeDesc") },
    { id: "link", label: t("embedInstructions.directLink"), desc: t("embedInstructions.directLinkDesc") },
  ];

  return (
    <div>
      {/* Customization */}
      <div className="mb-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">{t("embedInstructions.customize")}</h4>

        <div className="flex flex-col sm:flex-row gap-5 flex-wrap">
          {/* Theme */}
          <div>
            <span className="block text-xs font-medium text-gray-500 mb-2">{t("embedInstructions.theme")}</span>
            <div className="inline-flex rounded-xl overflow-hidden border border-gray-200">
              <button
                onClick={() => setTheme("light")}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  theme === "light"
                    ? "bg-accent text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {t("embedInstructions.light")}
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  theme === "dark"
                    ? "bg-accent text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {t("embedInstructions.dark")}
              </button>
            </div>
          </div>

          {/* Color */}
          <div>
            <span className="block text-xs font-medium text-gray-500 mb-2">{t("embedInstructions.accentColor")}</span>
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

          {/* Font size */}
          <div>
            <span className="block text-xs font-medium text-gray-500 mb-2">{t("embedInstructions.fontSize")}</span>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="12">12px</option>
              <option value="14">14px</option>
              <option value="15">15px</option>
              <option value="16">16px</option>
              <option value="18">18px</option>
              <option value="20">20px</option>
            </select>
          </div>

          {/* Max testimonials */}
          <div>
            <span className="block text-xs font-medium text-gray-500 mb-2">{t("embedInstructions.maxTestimonials")}</span>
            <select
              value={maxTestimonials}
              onChange={(e) => setMaxTestimonials(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          {/* Hide branding */}
          <div>
            <span className="block text-xs font-medium text-gray-500 mb-2">{t("embedInstructions.hideBranding")}</span>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hideBranding}
                onChange={(e) => setHideBranding(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <span className="text-sm text-gray-600">{hideBranding ? "Yes" : "No"}</span>
            </label>
          </div>

          {/* Rating summary */}
          <div>
            <span className="block text-xs font-medium text-gray-500 mb-2">{t("embedInstructions.showSummary")}</span>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showSummary}
                onChange={(e) => setShowSummary(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <span className="text-sm text-gray-600">{showSummary ? "Yes" : "No"}</span>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div
          className={`rounded-xl p-4 mt-4 flex items-center justify-between transition-colors ${
            theme === "dark" ? "bg-gray-900" : "bg-white border border-gray-200"
          }`}
        >
          <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{t("embedInstructions.preview")}</span>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: `#${accent}` }}
              className="w-5 h-5 rounded-full"
            />
            <span
              style={{ color: `#${accent}`, fontSize: `${fontSize}px` }}
              className="font-semibold"
            >
              TestiWall
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === tabItem.id
                ? "bg-accent text-white shadow-md shadow-accent/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {tabs.find((tabItem) => tabItem.id === tab)?.desc}
      </p>

      {tab === "simple" && (
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-700 mb-3 font-medium">
              {t("embedInstructions.pasteCode")}
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
              <strong>Carrd:</strong> {t("embedInstructions.carrd")}
              <br />
              <strong>WordPress:</strong> {t("embedInstructions.wordpress")}
              <br />
              <strong>Wix / Webflow:</strong> {t("embedInstructions.wix")}
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
            {t("embedInstructions.adjustHeight")}
          </p>
        </div>
      )}

      {tab === "link" && (
        <div className="space-y-3">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-700 mb-3 font-medium">
              {t("embedInstructions.shareLink")}
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
                {t("general.open")}
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {t("embedInstructions.idealFor")}
          </p>
        </div>
      )}

      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-sm font-medium text-gray-700 mb-2">
          {t("embedInstructions.dontKnow")}
        </p>
        <a
          href="https://www.youtube.com/results?search_query=how+to+add+embed+code+to+website"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/>
          </svg>
          {t("embedInstructions.watchTutorials")}
        </a>
      </div>
    </div>
  );
}
