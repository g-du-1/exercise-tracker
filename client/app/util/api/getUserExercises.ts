import { UserExercise } from "../../types";
import { fetchWithAuth } from "../fetchWithAuth";

export const getUserExercises = async (): Promise<UserExercise[]> => {
  const resp = await fetchWithAuth(`/user-exercises`);

  return resp.json();
};
