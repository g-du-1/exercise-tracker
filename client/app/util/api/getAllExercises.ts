import { fetchWithAuth } from "../fetchWithAuth";
import { Exercise } from "../../types";

export const getAllExercises = async (): Promise<Exercise[]> => {
  const resp = await fetchWithAuth("/exercises");

  return resp.json();
};
