import { useQuery } from "@tanstack/react-query";
import { getUserExercises } from "../util/api/getUserExercises";

export const useGetUserExercises = () => {
  return useQuery({
    queryKey: ["getUserExercises"],
    queryFn: getUserExercises,
  });
};
