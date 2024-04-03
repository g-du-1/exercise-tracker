import { Exercise, SavedReps } from "app/types";
import { StateCreator } from "zustand";

export interface ExerciseTrackerSlice {
  showComments: boolean;
  showMedia: boolean;
  showCompletedExercises: boolean;
  selectedExercise: Exercise | null;
  savedReps: {
    [key: string]: SavedReps;
  };
  savedStartTime: string;
  setShowComments: (newValue: boolean) => void;
  setShowMedia: (newValue: boolean) => void;
  setShowCompletedExercises: (newValue: boolean) => void;
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
  showComments: false,
  showMedia: false,
  showCompletedExercises: true,
  selectedExercise: null,
  savedReps: {},
  savedStartTime: "",
  setShowComments: (newValue) => set({ showComments: newValue }),
  setShowMedia: (newValue) => set({ showMedia: newValue }),
  setShowCompletedExercises: (newValue) =>
    set({ showCompletedExercises: newValue }),
  setSavedReps: (newValue) => set({ savedReps: newValue }),
  setSelectedExercise: (newValue) => set({ selectedExercise: newValue }),
  setSavedStartTime: (newValue) => set({ savedStartTime: newValue }),
});
