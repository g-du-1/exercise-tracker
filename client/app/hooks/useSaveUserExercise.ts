import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "../util/fetchWithAuth";

export const useSaveUserExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (exerciseId: number) => {
      return await fetchWithAuth("/user-exercises/save", {
        method: "POST",
        body: JSON.stringify({ exerciseId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserExercises"] });
    },
  });
};
