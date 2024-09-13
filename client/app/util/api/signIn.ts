import { fetchWithAuth } from "../fetchWithAuth";
import { SignInResponse } from "../../types";

export const signIn = async (username: string, password: string) => {
  const response = await fetchWithAuth(
    process.env.NEXT_PUBLIC_API_SIGN_IN_ENDPOINT || "/auth/public/signin",
    {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    },
  );

  const data: SignInResponse = await response.json();

  if (response.status === 200 && data.jwtToken) {
    localStorage.setItem("JWT_TOKEN", data.jwtToken);
  }

  return {
    status: response.status,
    message: data.message,
  };
};
