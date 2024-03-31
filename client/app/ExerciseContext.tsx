import { createContext } from "react";
import { ExerciseTracker } from "./types";

export const ExerciseTrackerContext = createContext<ExerciseTracker>({
  showCompletedExercises: true,
  setShowCompletedExercises: () => {},
  savedStartTime: "",
  setSavedStartTime: () => {},
  savedReps: {},
  setSavedReps: () => {},
  setSelectedExercise: () => {},
  selectedExercise: null,
  showMoreInfo: false,
  setShowMoreInfo: () => {},
});
