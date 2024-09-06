import { fetchWithAuth } from "../fetchWithAuth";
import { UserExercise } from "../../types";

export const getUserExercises = async (): Promise<UserExercise[]> => {
  const resp = await fetchWithAuth(`/user-exercises`);

  return resp.json();
};
