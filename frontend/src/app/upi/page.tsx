"use client";
import * as React from "react";
import UpiForm, { UpiFormData } from "@/components/UpiForm";
import { useQrGenerator } from "@/hooks/useQrGenerator";
import { QrCodePreview } from "@/components/QrCodePreview";
import { toPng } from "html-to-image";

export default function UpiPage() {
  const { qrResult, loading, handleSubmit: generateQr } = useQrGenerator();
  const [upiId, setUpiId] = React.useState("");
  const [name, setName] = React.useState("");
  const previewRef = React.useRef<HTMLDivElement>(null);

  const handleUpiSubmit = (data: UpiFormData) => {
    const { upiId, name, styling } = data;
    setUpiId(upiId);
    setName(name);
    generateQr("upi", {
      upiid: upiId,
      name: name,
      ...styling,
    });
  };

  const handleDownload = async () => {
    if (previewRef.current) {
      const dataUrl = await toPng(previewRef.current);
      const link = document.createElement("a");
      link.download = "upi-qr-code.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#18181b] dark:to-[#23272f]">
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-extrabold text-center mb-6">UPI QR Generator</h1>
          <UpiForm onSubmit={handleUpiSubmit} loading={loading} qrResult={qrResult} onDownload={handleDownload} />
        </div>
        <QrCodePreview ref={previewRef} qrResult={qrResult} upiId={upiId} merchantName={name} />
      </div>
    </main>
  );
}
