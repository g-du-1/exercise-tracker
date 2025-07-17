import { useQuery } from "@tanstack/react-query";
import { getUserExercises } from "../util/api/getUserExercises";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { APIError } from "../errors/APIError";

export const useGetUserExercises = () => {
  const router = useRouter();

  const result = useQuery({
    queryKey: ["getUserExercises"],
    queryFn: getUserExercises,
  });

  const { error } = result;

  useEffect(() => {
    if (error instanceof APIError) {
      error.status === 401 && router.push("/sign-in");
    }
  }, [error]);

  return result;
};
