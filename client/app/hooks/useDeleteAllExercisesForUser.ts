import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllExercisesForUser } from "../util/api/deleteAllExercisesForUser";

export const useDeleteAllExercisesForUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllExercisesForUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserExercises"] });
    },
  });
};
