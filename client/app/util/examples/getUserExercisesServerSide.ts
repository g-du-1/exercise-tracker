import { cookies } from "next/headers";

// Just an example, unused for now.
export const getUserExercisesServerSide = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const resp = await fetch("http://localhost:8080/api/v1/user-exercises", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: cookieHeader,
    },
    credentials: "include",
  });

  if (!resp.ok) {
    throw new Error(`API request failed: ${resp.statusText}`);
  }

  return resp.json();
};
