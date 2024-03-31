import { createContext } from "react";
import { Stopwatch } from "../types";

export const StopwatchContext = createContext<Stopwatch>({
  swRunning: false,
  swElapsedTime: 0,
  startStopwatch: () => {},
  resetStopwatch: () => {},
  formatSwTime: () => "",
});
