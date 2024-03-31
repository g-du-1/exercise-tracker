import { Exercise, ExerciseTracker, SavedReps } from "app/types";
import { useState } from "react";

export const useExerciseTracker = (): ExerciseTracker => {
  const [showCompletedExercises, setShowCompletedExercises] = useState(true);
  const [savedStartTime, setSavedStartTime] = useState("");
  const [savedReps, setSavedReps] = useState<{
    [key: string]: SavedReps;
  }>({});
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  return {
    showCompletedExercises,
    setShowCompletedExercises,
    savedStartTime,
    setSavedStartTime,
    savedReps,
    setSavedReps,
    setSelectedExercise,
    selectedExercise,
    showMoreInfo,
    setShowMoreInfo,
  };
};
