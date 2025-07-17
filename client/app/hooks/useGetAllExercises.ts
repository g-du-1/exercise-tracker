import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../util/fetchWithAuth";
import { Exercise } from "../types";
import { APIError } from "../errors/APIError";

export const useGetAllExercises = () => {
  return useQuery<Exercise[], APIError>({
    queryKey: ["getAllExercises"],
    queryFn: async () => {
      return await fetchWithAuth(
        process.env.NEXT_PUBLIC_GET_ALL_EXERCISES_ENDPOINT || "/exercises",
      );
    },
  });
};
