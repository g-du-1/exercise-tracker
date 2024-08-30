import { getCsrfToken } from "./getCsrfToken";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const baseUrl = "/api/v1";
  const authTokenName = "JWT_TOKEN";
  const csrfTokenName = "CSRF_TOKEN";
  const csrfHeaderName = "X-XSRF-TOKEN";

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

  const csrfToken = localStorage.getItem(csrfTokenName);

  if (csrfToken) {
    options.headers[csrfHeaderName] = csrfToken;
  } else {
    try {
      const newToken = await getCsrfToken(baseUrl);

      if (newToken) {
        localStorage.setItem(csrfTokenName, newToken);

        options.headers[csrfHeaderName] = newToken;
      }
    } catch (error) {
      throw new Error("Couldn't get CSRF Token.");
    }
  }

  return fetch(`${baseUrl}${url}`, options);
};
