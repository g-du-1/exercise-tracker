import { UserExercise } from "../../types";
import { fetchWithAuth } from "../fetchWithAuth";
import { exercises } from "../../constants";

export const getUserExercises = async (): Promise<UserExercise[]> => {
  if (process.env.NEXT_PUBLIC_ENABLE_API_CONNECTION === "true") {
    return await fetchWithAuth(`/user-exercises`);
  } else {
    return exercises;
  }
};
