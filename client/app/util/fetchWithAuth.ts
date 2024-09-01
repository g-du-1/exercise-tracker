export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_PREFIX || "/api/v1";
  const authTokenName = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || "JWT_TOKEN";

  options.credentials = "include";

  options.headers = {
    ...(options.headers as Record<string, string>),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const token = localStorage.getItem(authTokenName);

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${baseUrl}${url}`, options);
};
