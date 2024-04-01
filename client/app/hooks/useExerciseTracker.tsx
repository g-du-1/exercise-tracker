import { Exercise, ExerciseTracker, SavedReps } from "app/types";
import { useState } from "react";
import { useStopwatch } from "./useStopwatch";
import { useFormModal } from "./useFormModal";

export const useExerciseTracker = (): ExerciseTracker => {
  const [showCompletedExercises, setShowCompletedExercises] = useState(true);
  const [savedStartTime, setSavedStartTime] = useState("");
  const [savedReps, setSavedReps] = useState<{
    [key: string]: SavedReps;
  }>({});
  const [showMedia, setShowMedia] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const { fieldValue, setFieldValue, modalOpen, setModalOpen } = useFormModal();

  const {
    swRunning,
    swElapsedTime,
    startStopwatch,
    resetStopwatch,
    formatSwTime,
  } = useStopwatch();

  return {
    showCompletedExercises,
    setShowCompletedExercises,
    savedStartTime,
    setSavedStartTime,
    savedReps,
    setSavedReps,
    setSelectedExercise,
    selectedExercise,
    showMedia,
    setShowMedia,
    fieldValue,
    setFieldValue,
    modalOpen,
    setModalOpen,
    swRunning,
    swElapsedTime,
    startStopwatch,
    resetStopwatch,
    formatSwTime,
    showComments,
    setShowComments,
  };
};
