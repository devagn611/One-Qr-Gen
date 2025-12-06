"use client";
import * as React from "react";

const ColorInput = React.memo(({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  }, [onChange]);

  return (
    <label className="block">
      <span className="block mb-1 font-medium text-zinc-700 dark:text-zinc-200">{label}</span>
      <div className="flex items-center gap-3">
        <div 
          className="w-12 h-12 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 shadow-sm flex-shrink-0 transition-colors duration-100"
          style={{ backgroundColor: value }}
          title={value}
        />
        <input 
          type="color" 
          value={value}
          onChange={handleChange}
          className="flex-1 h-12 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" 
        />
        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 min-w-[70px] text-right select-none">
          {value.toUpperCase()}
        </span>
      </div>
    </label>
  );
});

ColorInput.displayName = "ColorInput";

export interface StylingOptionsData {
  dotsOptions: { color: string };
  backgroundOptions: { color: string };
  cornersSquareOptions: { color: string };
  cornersDotOptions: { color: string };
}

interface StylingOptionsProps {
  styling: StylingOptionsData;
  setStyling: React.Dispatch<React.SetStateAction<StylingOptionsData>>;
}

export const StylingOptions = React.memo(({ styling, setStyling }: StylingOptionsProps) => {
  const handleDotsColorChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStyling(prev => ({ ...prev, dotsOptions: { ...prev.dotsOptions, color: e.target.value } }));
  }, [setStyling]);

  const handleBackgroundColorChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStyling(prev => ({ ...prev, backgroundOptions: { ...prev.backgroundOptions, color: e.target.value } }));
  }, [setStyling]);

  const handleCornersSquareColorChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStyling(prev => ({ ...prev, cornersSquareOptions: { ...prev.cornersSquareOptions, color: e.target.value } }));
  }, [setStyling]);

  const handleCornersDotColorChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStyling(prev => ({ ...prev, cornersDotOptions: { ...prev.cornersDotOptions, color: e.target.value } }));
  }, [setStyling]);

  return (
    <details className="mb-4">
      <summary className="cursor-pointer font-medium text-zinc-700 dark:text-zinc-200">Styling Options</summary>
      <div className="grid grid-cols-1 gap-4 pt-4">
        <ColorInput 
          label="Dots Color" 
          value={styling.dotsOptions.color} 
          onChange={handleDotsColorChange}
        />
        <ColorInput 
          label="Background Color" 
          value={styling.backgroundOptions.color} 
          onChange={handleBackgroundColorChange}
        />
        <ColorInput 
          label="Corner Square Color" 
          value={styling.cornersSquareOptions.color} 
          onChange={handleCornersSquareColorChange}
        />
        <ColorInput 
          label="Corner Dot Color" 
          value={styling.cornersDotOptions.color} 
          onChange={handleCornersDotColorChange}
        />
      </div>
    </details>
  );
});

StylingOptions.displayName = "StylingOptions";
