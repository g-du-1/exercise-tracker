import { Exercise, SavedReps } from "../types";
import { create, StateCreator } from "zustand";

interface ExerciseTrackerSlice {
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

interface FormModalSlice {
  fieldValue: string;
  modalOpen: boolean;
  setFieldValue: (newValue: string) => void;
  setModalOpen: (newValue: boolean) => void;
}

interface StopwatchSlice {
  swRunning: boolean;
  swElapsedTime: number;
  swInterval: NodeJS.Timeout | null;
  startStopwatch: () => void;
  resetStopwatch: () => void;
  formatSwTime: (timeInSeconds: number) => string;
}

const createExerciseTrackerSlice: StateCreator<
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

const createFormModalSlice: StateCreator<
  FormModalSlice,
  [],
  [],
  FormModalSlice
> = (set) => ({
  fieldValue: "",
  modalOpen: false,
  setFieldValue: (newValue) => set({ fieldValue: newValue }),
  setModalOpen: (newValue) => set({ modalOpen: newValue }),
});

const createStopwatchSlice: StateCreator<
  StopwatchSlice,
  [],
  [],
  StopwatchSlice
> = (set) => ({
  swRunning: false,
  swElapsedTime: 0,
  swInterval: null,
  startStopwatch: () => {
    set((state) => ({ ...state, swRunning: true }));

    const interval = setInterval(() => {
      set((state) => ({ ...state, swElapsedTime: state.swElapsedTime + 1 }));
    }, 1000);

    set((state) => ({ ...state, swInterval: interval }));
  },
  resetStopwatch: () => {
    set((state) => {
      if (state.swInterval) clearInterval(state.swInterval);

      return { ...state, swRunning: false, swElapsedTime: 0, swInterval: null };
    });
  },
  formatSwTime: (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  },
});

export const useBoundStore = create<
  ExerciseTrackerSlice & FormModalSlice & StopwatchSlice
>()((...a) => ({
  ...createExerciseTrackerSlice(...a),
  ...createFormModalSlice(...a),
  ...createStopwatchSlice(...a),
}));
