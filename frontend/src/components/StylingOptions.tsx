"use client";
import * as React from "react";

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block mb-1 font-medium text-zinc-700 dark:text-zinc-200">{label}</span>
      <input className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />
    </label>
  );
}

export interface StylingOptionsData {
  dotsOptions: { color: string };
  backgroundOptions: { color: string };
  cornersSquareOptions: { color: string };
  cornersDotOptions: { color: string };
}

interface StylingOptionsProps {
  styling: StylingOptionsData;
  setStyling: (styling: StylingOptionsData) => void;
}

export function StylingOptions({ styling, setStyling }: StylingOptionsProps) {
  return (
    <details className="mb-4">
      <summary className="cursor-pointer font-medium text-zinc-700 dark:text-zinc-200">Styling Options</summary>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <Input 
          label="Dots Color" 
          type="color" 
          value={styling.dotsOptions.color} 
          onChange={e => setStyling({ ...styling, dotsOptions: { ...styling.dotsOptions, color: e.target.value } })} 
        />
        <Input 
          label="Background Color" 
          type="color" 
          value={styling.backgroundOptions.color} 
          onChange={e => setStyling({ ...styling, backgroundOptions: { ...styling.backgroundOptions, color: e.target.value } })} 
        />
        <Input 
          label="Corner Square Color" 
          type="color" 
          value={styling.cornersSquareOptions.color} 
          onChange={e => setStyling({ ...styling, cornersSquareOptions: { ...styling.cornersSquareOptions, color: e.target.value } })} 
        />
        <Input 
          label="Corner Dot Color" 
          type="color" 
          value={styling.cornersDotOptions.color} 
          onChange={e => setStyling({ ...styling, cornersDotOptions: { ...styling.cornersDotOptions, color: e.target.value } })} 
        />
      </div>
    </details>
  );
}
