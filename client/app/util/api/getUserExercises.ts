import { UserExercise } from "../../types";
import { fetchWithAuth } from "../fetchWithAuth";
import { exercises } from "../../constants";

export const getUserExercises = async (): Promise<UserExercise[]> => {
  if (process.env.NEXT_PUBLIC_ENABLE_API_CONNECTION === "true") {
    const resp = await fetchWithAuth(`/user-exercises`);
    return resp.json();
  } else {
    return exercises;
  }
};
