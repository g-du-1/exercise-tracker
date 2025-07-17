import { fetchWithAuth } from "../fetchWithAuth";

export const deleteAllExercisesForUser = async () => {
  return await fetchWithAuth("/user-exercises/all", {
    method: "DELETE",
  });
};
