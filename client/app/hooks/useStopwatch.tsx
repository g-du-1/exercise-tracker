import { Stopwatch } from "app/types";
import { useState, useRef } from "react";

export const useStopwatch = (): Stopwatch => {
  const [swRunning, setSwRunning] = useState(false);
  const [swElapsedTime, setSwElapsedTime] = useState(0);
  const swIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStopwatch = () => {
    setSwRunning(true);

    swIntervalRef.current = setInterval(() => {
      setSwElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);
  };

  const resetStopwatch = () => {
    if (swIntervalRef.current) clearInterval(swIntervalRef.current);

    setSwElapsedTime(0);
    setSwRunning(false);
  };

  const formatSwTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    swRunning,
    swElapsedTime,
    startStopwatch,
    resetStopwatch,
    formatSwTime,
  };
};
