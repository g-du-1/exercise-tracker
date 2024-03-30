import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

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

  const resetStopwatch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setElapsedTime(0);
    setIsRunning(false);
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
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <IconButton
        color="success"
        size="large"
        aria-label="Start Stopwatch"
        disabled={isRunning}
        onClick={startStopwatch}
      >
        <PlayArrowIcon />
      </IconButton>

      <IconButton
        size="large"
        color="error"
        aria-label="Reset Stopwatch"
        disabled={!isRunning}
        onClick={resetStopwatch}
      >
        <RestartAltIcon />
      </IconButton>

      <Box sx={{ ml: 1 }}>{formatTime(elapsedTime)}</Box>
    </Box>
  );
};
