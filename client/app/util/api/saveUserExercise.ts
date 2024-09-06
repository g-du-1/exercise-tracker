import { fetchWithAuth } from "../fetchWithAuth";
import { Exercise } from "../../types";

export const saveUserExercise = async (
  exerciseId: number,
): Promise<Exercise> => {
  const response = await fetchWithAuth("/user-exercises/save", {
    method: "POST",
    body: JSON.stringify({ exerciseId }),
  });

  return response.json();
};
