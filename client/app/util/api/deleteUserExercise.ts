import { fetchWithAuth } from "../fetchWithAuth";

export const deleteUserExercise = async (exerciseId: number) => {
  const response = await fetchWithAuth("/user-exercises", {
    method: "DELETE",
    body: JSON.stringify({ exerciseId }),
  });

  return response.text();
};
