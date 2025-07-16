import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveUserExercise } from "../util/api/saveUserExercise";

export const useSaveUserExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveUserExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserExercises"] });
    },
  });
};
