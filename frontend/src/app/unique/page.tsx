"use client";
import * as React from "react";
import { UniqueForm, UniqueFormData } from "@/components/UniqueForm";
import { useQrGenerator } from "@/hooks/useQrGenerator";

export default function UniquePage() {
  const { qrResult, loading, handleSubmit: generateQr } = useQrGenerator();

  const handleUniqueSubmit = (data: UniqueFormData) => {
    const { text, styling } = data;
    generateQr("unique", { text, ...styling });
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#18181b] dark:to-[#23272f]">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          Unique QR Generator
        </h1>
        <UniqueForm
          onSubmit={handleUniqueSubmit}
          loading={loading}
          qrResult={qrResult}
        />
      </div>
    </main>
  );
}
