"use client";

import { ExerciseTracker } from "./ExerciseTracker";
import { useGetUserExercises } from "../hooks/useGetUserExercises";

export const TrackerApp = () => {
  const { data } = useGetUserExercises();

  return <ExerciseTracker exercises={data} />;
};
