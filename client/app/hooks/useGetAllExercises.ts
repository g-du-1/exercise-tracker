import { useQuery } from "@tanstack/react-query";
import { getAllExercises } from "../util/api/getAllExercises";

export const useGetAllExercises = () => {
  return useQuery({
    queryKey: ["getAllExercises"],
    queryFn: getAllExercises,
  });
};
