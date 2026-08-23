"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n-context";

export function EditSpaceForm({
  spaceId,
  name,
  question,
  thankYouMsg,
}: {
  spaceId: string;
  name: string;
  question: string;
  thankYouMsg: string;
}) {
  const [open, setOpen] = useState(false);
  const [formName, setFormName] = useState(name);
  const [formQuestion, setFormQuestion] = useState(question);
  const [formThankYou, setFormThankYou] = useState(thankYouMsg);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);

    if (!formName.trim()) {
      setError(t("editSpace.nameRequired"));
      return;
    }

    setSaving(true);
    const res = await fetch("/api/spaces/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: spaceId,
        name: formName,
        question: formQuestion,
        thank_you_msg: formThankYou,
      }),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || t("editSpace.error"));
      return;
    }

    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 3000);
  }

  if (!open) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{t("editSpace.title")}</h3>
            <p className="text-sm text-gray-500">{t("editSpace.desc")}</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex-shrink-0 text-sm font-medium text-accent hover:underline"
          >
            {t("editSpace.edit")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">{t("editSpace.title")}</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("editSpace.name")}
          </label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
            maxLength={100}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm transition-all focus:border-accent/50 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("editSpace.question")}
          </label>
          <input
            type="text"
            value={formQuestion}
            onChange={(e) => setFormQuestion(e.target.value)}
            maxLength={300}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm transition-all focus:border-accent/50 outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">{t("editSpace.questionHint")}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("editSpace.thankYou")}
          </label>
          <input
            type="text"
            value={formThankYou}
            onChange={(e) => setFormThankYou(e.target.value)}
            maxLength={300}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm transition-all focus:border-accent/50 outline-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        {saved && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2.5">
            <p className="text-emerald-700 text-sm">{t("editSpace.saved")}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20"
          >
            {saving ? t("editSpace.saving") : t("editSpace.save")}
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setFormName(name);
              setFormQuestion(question);
              setFormThankYou(thankYouMsg);
              setError("");
            }}
            className="px-5 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            {t("editSpace.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}
