import { fetchWithAuth } from "../fetchWithAuth";

export const deleteAllExercisesForUser = async () => {
  const response = await fetchWithAuth("/user-exercises/all", {
    method: "DELETE",
  });

  return response.json();
};
