import { Exercise } from "../../types";
import { fetchWithAuth } from "../fetchWithAuth";

export const getAllExercises = async (): Promise<Exercise[]> => {
  const resp = await fetchWithAuth(
    process.env.NEXT_PUBLIC_GET_ALL_EXERCISES_ENDPOINT || "/exercises",
  );

  if (resp.status !== 200) {
    throw new Error("Failed to get all exercises.");
  }

  return resp.json();
};
