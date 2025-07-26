"use client";
import Image from "next/image";

export function FormActions({ loading, qrResult, onDownload }: { loading: boolean; qrResult: string | null; onDownload?: () => void }) {
  
    return (
    <div className="flex flex-col gap-4 mt-4">
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-60" disabled={loading}>
        {loading ? "Generating..." : "Generate QR"}
      </button>
      {qrResult && qrResult !== "error" && (
        <div className="flex flex-col items-center gap-2">
          <Image src={qrResult} alt="Generated QR Code" width={256} height={256} className="rounded-lg bg-white p-6" />
          <button type="button" onClick={onDownload} className="text-blue-600 underline">Download QR Code</button>
        </div>
      )}
      {qrResult === "error" && <div className="text-red-600 text-center">Failed to generate QR. Try again.</div>}
    </div>
  );
}
