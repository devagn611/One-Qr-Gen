"use client";
import * as React from "react";
import { useDebouncedCallback } from "use-debounce";
import { apiUrl } from "@/utils/api";
import { StylingOptionsData } from "@/components/StylingOptions";

type QrCodeData = StylingOptionsData & {
  [key: string]: string | number | boolean | undefined | null | { color: string; };
};

export function useQrGenerator() {
  const [qrResult, setQrResult] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const generateQr = React.useCallback(async (endpoint: string, data: QrCodeData) => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setQrResult(null);
    try {
      const { dotsOptions, backgroundOptions, cornersSquareOptions, cornersDotOptions, ...rest } = data;
      
      const params = new URLSearchParams();
      for (const key in rest) {
        const value = rest[key];
        if (value) {
            params.append(key, value.toString());
        }
      }

      if (dotsOptions) params.append("dotsOptions.color", dotsOptions.color);
      if (backgroundOptions) params.append("backgroundOptions.color", backgroundOptions.color);
      if (cornersSquareOptions) params.append("cornersSquareOptions.color", cornersSquareOptions.color);
      if (cornersDotOptions) params.append("cornersDotOptions.color", cornersDotOptions.color);

      const linkUrl = apiUrl(`/api/v1/${endpoint}?${params.toString()}`);
      const res = await fetch(linkUrl, {
        method: "GET",
        headers: {
          Accept: "image/png",
        },
        signal: abortControllerRef.current.signal,
      });
      if (!res.ok) throw new Error("Failed to generate QR");
      const blob = await res.blob();
      setQrResult(URL.createObjectURL(blob));
    } catch (e: unknown) {
      // Ignore abort errors
      if (e instanceof Error && e.name === 'AbortError') {
        return;
      }
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unexpected error occurred:", e);
      }
      setQrResult("error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce the QR generation with 300ms delay
  const debouncedGenerateQr = useDebouncedCallback(generateQr, 300);

  const handleSubmit = React.useCallback((endpoint: string, data: QrCodeData) => {
    debouncedGenerateQr(endpoint, data);
  }, [debouncedGenerateQr]);

  return { qrResult, loading, handleSubmit };
}
