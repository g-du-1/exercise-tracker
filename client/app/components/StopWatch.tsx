import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { StopwatchContext } from "../context/StopwatchContext";
import { ExerciseTrackerContext } from "../context/ExerciseContext";

export const StopWatch = () => {
  const {
    swRunning,
    swElapsedTime,
    startStopwatch,
    resetStopwatch,
    formatSwTime,
  } = useContext(StopwatchContext);

  const { selectedExercise } = useContext(ExerciseTrackerContext);

  const restTimeExceeded =
    selectedExercise &&
    swElapsedTime > 0 &&
    swElapsedTime >= selectedExercise.targetRest;

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <IconButton
        color="success"
        size="large"
        aria-label="Start Stopwatch"
        disabled={swRunning}
        onClick={startStopwatch}
      >
        <PlayArrowIcon />
      </IconButton>

      <IconButton
        size="large"
        color="error"
        aria-label="Reset Stopwatch"
        disabled={!swRunning}
        onClick={resetStopwatch}
      >
        <RestartAltIcon />
      </IconButton>

      <Box sx={{ ml: 1 }}>{formatSwTime(swElapsedTime)}</Box>

      {restTimeExceeded && (
        <IconButton size="large" color="warning" aria-label="Rest Time Passed">
          <WarningIcon />
        </IconButton>
      )}
    </Box>
  );
};
