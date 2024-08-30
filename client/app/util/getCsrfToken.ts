export const getCsrfToken = async (baseUrl: string) => {
  const response = await fetch(`${baseUrl}/csrf-token`, {
    credentials: "include",
  });

  const data = await response?.json();

  return data?.token;
};
