"use client";
import * as React from "react";
import { VcardForm, VcardFormData } from "@/components/VcardForm";
import { useQrGenerator } from "@/hooks/useQrGenerator";

export default function VcardPage() {
  const { qrResult, loading, handleSubmit: generateQr } = useQrGenerator();

  const handleVcardSubmit = (data: VcardFormData) => {
    const { name, email, phone, styling } = data;
    generateQr("vcard", { name, email, phone, ...styling });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#18181b] dark:to-[#23272f]">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6">vCard QR Generator</h1>
        <VcardForm onSubmit={handleVcardSubmit} loading={loading} qrResult={qrResult} />
      </div>
    </main>
  );
}
