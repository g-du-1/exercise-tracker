import { create } from "zustand";
import {
  createExerciseTrackerSlice,
  ExerciseTrackerSlice,
} from "./exerciseTracker";
import { createStopwatchSlice, StopwatchSlice } from "./stopwatch";
import { createFormModalSlice, FormModalSlice } from "./formModal";

export const useBoundStore = create<
  ExerciseTrackerSlice & FormModalSlice & StopwatchSlice
>()((...a) => ({
  ...createExerciseTrackerSlice(...a),
  ...createFormModalSlice(...a),
  ...createStopwatchSlice(...a),
}));
