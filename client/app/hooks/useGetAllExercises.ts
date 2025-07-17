import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../util/fetchWithAuth";

export const useGetAllExercises = () => {
  return useQuery({
    queryKey: ["getAllExercises"],
    queryFn: async () => {
      return await fetchWithAuth(
        process.env.NEXT_PUBLIC_GET_ALL_EXERCISES_ENDPOINT || "/exercises",
      );
    },
  });
};
