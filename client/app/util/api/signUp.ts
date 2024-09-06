import { fetchWithAuth } from "../fetchWithAuth";
import { SignupResponse } from "../../types";

export const signUp = async (
  username: string,
  password: string,
  email: string,
): Promise<SignupResponse> => {
  const response = await fetchWithAuth(
    process.env.NEXT_PUBLIC_API_SIGN_UP_ENDPOINT || "/auth/public/signup",
    {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        role: ["user"],
      }),
    },
  );

  return response.json();
};
