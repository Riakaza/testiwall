"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n-context";

export function DeleteAccountButton() {
  const [isConfirming, setIsConfirming] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await fetch("/api/account/delete", { method: "POST" });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || t("general.error"));
      setIsLoading(false);
      setIsConfirming(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-3">
        <p className="text-sm text-red-800 mb-3 font-medium">
          {t("dashboard.deleteConfirmText")} <strong>DELETE</strong>
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="DELETE"
          className="w-full border border-red-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        <div className="flex gap-3">
          <button
            onClick={() => { setIsConfirming(false); setInputValue(""); }}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t("general.cancel")}
          </button>
          <button
            onClick={handleDelete}
            disabled={inputValue !== "DELETE" || isLoading}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? t("dashboard.deleting") : t("dashboard.confirmDelete")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
    >
      {t("dashboard.deleteAccount")}
    </button>
  );
}
