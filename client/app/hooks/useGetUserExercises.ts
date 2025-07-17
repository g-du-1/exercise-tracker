import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { APIError } from "../errors/APIError";
import { fetchWithAuth } from "../util/fetchWithAuth";
import { exercises } from "../constants";
import { UserExercise } from "../types";

export const useGetUserExercises = () => {
  const router = useRouter();

  const result = useQuery<UserExercise[], APIError>({
    queryKey: ["getUserExercises"],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_ENABLE_API_CONNECTION === "true") {
        return await fetchWithAuth(`/user-exercises`);
      } else {
        return exercises;
      }
    },
  });

  const { error } = result;

  useEffect(() => {
    if (error instanceof APIError) {
      error.status === 401 && router.push("/sign-in");
    }
  }, [error, router]);

  return result;
};
