import { APIError } from "../errors/APIError";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_PREFIX || "/api/v1";

  options.credentials = "include";

  options.headers = {
    ...(options.headers as Record<string, string>),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const resp = await fetch(`${baseUrl}${url}`, options);
  const result = await resp.json();

  if (!resp.ok) {
    throw new APIError(result.message || "API Error", resp.status, result);
  }

  return result;
};
