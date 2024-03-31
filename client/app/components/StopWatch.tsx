import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ExerciseTracker } from "../types";
import { useContext } from "react";
import { StopwatchContext } from "../context/StopwatchContext";

type Props = {
  exerciseTracker: ExerciseTracker;
};

export const StopWatch = ({ exerciseTracker }: Props) => {
  const {
    swRunning,
    swElapsedTime,
    startStopwatch,
    resetStopwatch,
    formatSwTime,
  } = useContext(StopwatchContext);

  const { selectedExercise } = exerciseTracker;

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
