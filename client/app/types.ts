import { Dispatch, SetStateAction } from "react";

type ExerciseCategory =
  | "warmup"
  | "firstPair"
  | "secondPair"
  | "thirdPair"
  | "coreTriplet";

type ExerciseType =
  | "warmup"
  | "pullUp"
  | "squat"
  | "dip"
  | "hinge"
  | "row"
  | "pushUp"
  | "antiExtension"
  | "antiRotation"
  | "extension";

export type Exercise = {
  id: number;
  name: string;
  type: ExerciseType;
  category: ExerciseCategory;
  comments?: string;
  thumbLink?: string;
  targetSets: number;
  targetRepsMin?: number;
  targetRepsMax?: number;
  isDuration?: boolean;
  targetRest: number;
};

export type SavedReps = {
  name: string;
  reps: number[];
};

export type Stopwatch = {
  swRunning: boolean;
  swElapsedTime: number;
  startStopwatch: () => void;
  resetStopwatch: () => void;
  formatSwTime: (timeInSeconds: number) => string;
};

export type FormModal = {
  fieldValue: string;
  setFieldValue: Dispatch<SetStateAction<string>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type ExerciseTracker = FormModal &
  Stopwatch & {
    showCompletedExercises: boolean;
    setShowCompletedExercises: Dispatch<SetStateAction<boolean>>;
    savedStartTime: string;
    setSavedStartTime: Dispatch<SetStateAction<string>>;
    savedReps: { [key: string]: SavedReps };
    setSavedReps: Dispatch<
      SetStateAction<{
        [key: string]: SavedReps;
      }>
    >;
    setSelectedExercise: Dispatch<SetStateAction<Exercise | null>>;
    selectedExercise: Exercise | null;
    showMoreInfo: boolean;
    setShowMoreInfo: Dispatch<SetStateAction<boolean>>;
  };
