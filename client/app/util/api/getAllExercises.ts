import { Exercise } from "../../types";
import { fetchWithAuth } from "../fetchWithAuth";

export const getAllExercises = async (): Promise<Exercise[]> => {
  return await fetchWithAuth(
    process.env.NEXT_PUBLIC_GET_ALL_EXERCISES_ENDPOINT || "/exercises",
  );
};
