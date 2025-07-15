import { useQuery } from "@tanstack/react-query";
import { getUserExercises } from "../util/api/getUserExercises";
import { exercises as hardcodedExercises } from "../constants";

export const useGetUserExercises = () => {
  return useQuery({
    queryKey: ["getUserExercises"],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_ENABLE_API_CONNECTION === "true") {
        return await getUserExercises();
      }

      return hardcodedExercises;
    },
  });
};
