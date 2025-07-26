"use client";
import * as React from "react";
import { AccountForm, AccountFormData } from "@/components/AccountForm";
import { useQrGenerator } from "@/hooks/useQrGenerator";

export default function UpiAccountPage() {
  const { qrResult, loading, handleSubmit: generateQr } = useQrGenerator();

  const handleUpiAccountSubmit = (data: AccountFormData) => {
    const { accountNumber, ifsc, name, styling } = data;
    generateQr("upiaccount", {
      name: name,
      acn: accountNumber,
      ifsc: ifsc,
      ...styling,
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#18181b] dark:to-[#23272f]">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6">Bank Account QR Generator</h1>
        <AccountForm onSubmit={handleUpiAccountSubmit} loading={loading} qrResult={qrResult} />
      </div>
    </main>
  );
}
