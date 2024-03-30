import { useRef, useState } from "react";

export const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStopwatch = () => {
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);
  };

  const stopStopwatch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsRunning(false);
  };

  const resetStopwatch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setElapsedTime(0);
    setIsRunning(false);
  };

  const toggleStopwatch = () => {
    isRunning ? stopStopwatch() : startStopwatch();
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div>{formatTime(elapsedTime)}</div>
      <div>
        <button onClick={toggleStopwatch}>Start / Stop</button>
        <button onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
};
