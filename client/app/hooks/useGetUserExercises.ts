import { useQuery } from "@tanstack/react-query";
import { getUserExercises } from "../util/api/getUserExercises";
import { exercises } from "../constants";

export const useGetUserExercises = () => {
  return useQuery({
    queryKey: ["getUserExercises"],
    queryFn: async () => {
      const featureFlag =
        process.env.NEXT_PUBLIC_ENABLE_API_CONNECTION === "true";

      if (featureFlag) {
        const userExercises = await getUserExercises();
        return userExercises.map((ue) => ue.exercise);
      }

      return exercises;
    },
  });
};
