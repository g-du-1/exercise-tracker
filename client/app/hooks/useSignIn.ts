import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn as signInApi } from "../util/api/signIn";

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => signInApi(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserExercises"] });
    },
  });
};
