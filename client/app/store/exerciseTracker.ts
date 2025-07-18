import { Exercise, SavedReps } from "app/types";
import { StateCreator } from "zustand";

export interface ExerciseTrackerSlice {
  selectedExercise: Exercise | null;
  savedReps: {
    [key: string]: SavedReps;
  };
  savedStartTime: string;
  setSelectedExercise: (newValue: Exercise) => void;
  setSavedReps: (newValue: { [key: string]: SavedReps }) => void;
  setSavedStartTime: (newValue: string) => void;
}

export const createExerciseTrackerSlice: StateCreator<
  ExerciseTrackerSlice,
  [],
  [],
  ExerciseTrackerSlice
> = (set) => ({
  selectedExercise: null,
  savedReps: {},
  savedStartTime: "",
  setSavedReps: (newValue) => set({ savedReps: newValue }),
  setSelectedExercise: (newValue) => set({ selectedExercise: newValue }),
  setSavedStartTime: (newValue) => set({ savedStartTime: newValue }),
});
