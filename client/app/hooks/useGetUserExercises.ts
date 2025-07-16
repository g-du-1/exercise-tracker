import { useQuery } from "@tanstack/react-query";
import { getUserExercises } from "../util/api/getUserExercises";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useGetUserExercises = () => {
  const router = useRouter();

  const result = useQuery({
    queryKey: ["getUserExercises"],
    queryFn: getUserExercises,
  });

  const { error } = result;

  useEffect(() => {
    if (error) {
      error.message === "401: Unauthorised" && router.push("/sign-in");
    }
  }, [error]);

  return result;
};
