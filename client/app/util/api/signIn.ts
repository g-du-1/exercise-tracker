import { fetchWithAuth } from "../fetchWithAuth";

export const signIn = async (username: string, password: string) => {
  return await fetchWithAuth(
    process.env.NEXT_PUBLIC_API_SIGN_IN_ENDPOINT || "/auth/public/signin",
    {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    },
  );
};
