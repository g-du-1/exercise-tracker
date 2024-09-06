import { fetchWithAuth } from "../fetchWithAuth";
import { User } from "../../types";

export const getUser = async (): Promise<User> => {
  const resp = await fetchWithAuth("/auth/user");

  return resp.json();
};
