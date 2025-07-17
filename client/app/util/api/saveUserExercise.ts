import { fetchWithAuth } from "../fetchWithAuth";
import { Exercise } from "../../types";

export const saveUserExercise = async (
  exerciseId: number,
): Promise<Exercise> => {
  return await fetchWithAuth("/user-exercises/save", {
    method: "POST",
    body: JSON.stringify({ exerciseId }),
  });
};
