import * as React from "react";
import { StylingOptions, StylingOptionsData } from "./StylingOptions";
import { FormActions } from "./FormActions";

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block mb-4">
      <span className="block mb-1 font-medium text-zinc-700 dark:text-zinc-200">{label}</span>
      <input className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />
    </label>
  );
}

export interface UniqueFormData {
  text: string;
  styling: StylingOptionsData;
}

interface UniqueFormProps {
  onSubmit: (data: UniqueFormData) => void;
  loading: boolean;
  qrResult: string | null;
}

export function UniqueForm({ onSubmit, loading, qrResult }: UniqueFormProps) {
  const [text, setText] = React.useState("");
  const [styling, setStyling] = React.useState<StylingOptionsData>({
    dotsOptions: { color: "#000000" },
    backgroundOptions: { color: "#ffffff" },
    cornersSquareOptions: { color: "#000000" },
    cornersDotOptions: { color: "#000000" },
  });
  
  return (
    <form className="space-y-2" onSubmit={e => { e.preventDefault(); onSubmit({ text, styling }); }}>
      <Input label="Text" value={text} onChange={e => setText(e.target.value)} required type="text" />
      <StylingOptions styling={styling} setStyling={setStyling} />
      <FormActions loading={loading} qrResult={qrResult} />
    </form>
  );
}
