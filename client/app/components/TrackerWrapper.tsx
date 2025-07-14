"use client";

import { ExerciseTracker } from "./ExerciseTracker";
import { useGetUserExercises } from "../hooks/useGetUserExercises";

export const TrackerWrapper = () => {
  const { data } = useGetUserExercises();

  return <ExerciseTracker exercises={data} />;
};
