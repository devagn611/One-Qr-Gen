export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.API_ENDPOINT || "";

export function apiUrl(path: string) {
  return `${API_ENDPOINT.replace(/\/$/, "")}${path.startsWith("/") ? path : "/" + path}`;
}
