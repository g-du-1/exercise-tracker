import { StateCreator } from "zustand";

export interface StopwatchSlice {
  swRunning: boolean;
  swElapsedTime: number;
  swInterval: NodeJS.Timeout | null;
  startStopwatch: () => void;
  resetStopwatch: () => void;
  formatSwTime: (timeInSeconds: number) => string;
}

export const createStopwatchSlice: StateCreator<
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
