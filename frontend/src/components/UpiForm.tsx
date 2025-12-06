import * as React from "react";
import { StylingOptions, StylingOptionsData } from "@/components/StylingOptions";
import { FormActions } from "./FormActions";

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block mb-4">
      <span className="block mb-1 font-medium text-zinc-700 dark:text-zinc-200">{label}</span>
      <input className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />
    </label>
  );
}

export interface UpiFormData {
  upiId: string;
  name: string;
  styling: StylingOptionsData;
}

interface UpiFormProps {
  onSubmit: (data: UpiFormData) => void;
  loading: boolean;
  qrResult?: string | null;
  onDownload: () => void;
}

export default function UpiForm({ onSubmit, loading, onDownload }: UpiFormProps) {
  const [upiId, setUpiId] = React.useState("");
  const [name, setName] = React.useState("");
  const [styling, setStyling] = React.useState<StylingOptionsData>({
    dotsOptions: { color: "#000000" },
    backgroundOptions: { color: "#ffffff" },
    cornersSquareOptions: { color: "#000000" },
    cornersDotOptions: { color: "#000000" },
  });
  return (
    <form className="space-y-2" onSubmit={e => { e.preventDefault(); onSubmit({ upiId, name, styling }); }}>
      <Input label="UPI ID" value={upiId} onChange={e => setUpiId(e.target.value)} required />
      <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
      <StylingOptions styling={styling} setStyling={setStyling} />
      <FormActions loading={loading} qrResult={""} onDownload={onDownload} />
    </form>
  );
}
