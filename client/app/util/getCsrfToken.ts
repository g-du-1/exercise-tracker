export const getCsrfToken = async (baseUrl: string) => {
  const csrfEndpoint =
    process.env.NEXT_PUBLIC_API_CSRF_ENDPOINT || "/csrf-token";

  const response = await fetch(`${baseUrl}${csrfEndpoint}`, {
    credentials: "include",
  });

  const data = await response?.json();

  return data?.token;
};
