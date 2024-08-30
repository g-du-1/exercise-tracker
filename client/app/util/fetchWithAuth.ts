type Options = {
  headers?: Record<string, string>;
  method?: "GET" | "POST";
  body?: string;
};

const baseURL = "/api/v1";

export const fetchWithAuth = async (url: string, options: Options = {}) => {
  let csrfToken = localStorage.getItem("CSRF_TOKEN");

  if (!csrfToken) {
    try {
      const response = await fetch(`${baseURL}/csrf-token`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      csrfToken = data.token;

      if (csrfToken) {
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      }
    } catch (error) {
      console.error("Failed to fetch CSRF token", error);
    }
  }

  const token = localStorage.getItem("JWT_TOKEN");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (csrfToken) {
    headers["X-XSRF-TOKEN"] = csrfToken;
  }

  console.log("X-XSRF-TOKEN " + csrfToken);

  return fetch(`${baseURL}${url}`, {
    credentials: "include",
    ...options,
    headers,
  });
};
