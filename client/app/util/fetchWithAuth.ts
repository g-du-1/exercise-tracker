export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_PREFIX || "/api/v1";

  options.credentials = "include";

  options.headers = {
    ...(options.headers as Record<string, string>),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const resp = await fetch(`${baseUrl}${url}`, options);

  if (resp?.status === 401) {
    throw new Error("401: Unauthorised");
  }

  if (resp?.status !== 200) {
    throw new Error("Something went wrong.");
  }

  return resp;
};
