"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserExercises } from "../util/api/getUserExercises";
import { ExerciseTracker } from "./ExerciseTracker";
import { exercises } from "../constants";

// TODO: Tests

export const TrackerWrapper = () => {
  const { data } = useQuery({
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

  if (!data) return null;

  return <ExerciseTracker exercises={data} />;
};
