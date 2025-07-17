import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "../util/fetchWithAuth";

type Payload = {
  username: string;
  password: string;
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password }: Payload) => {
      return await fetchWithAuth(
        process.env.NEXT_PUBLIC_API_SIGN_IN_ENDPOINT || "/auth/public/signin",
        {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserExercises"] });
    },
  });
};
