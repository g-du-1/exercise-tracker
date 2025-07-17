import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "../util/fetchWithAuth";

export const useDeleteAllExercisesForUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await fetchWithAuth("/user-exercises/all", {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserExercises"] });
    },
  });
};
