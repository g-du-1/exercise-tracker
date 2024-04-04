import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useBoundStore } from "../store/store";

export const StopWatch = () => {
  const selectedExercise = useBoundStore((state) => state.selectedExercise);
  const swRunning = useBoundStore((state) => state.swRunning);
  const swElapsedTime = useBoundStore((state) => state.swElapsedTime);
  const startStopwatch = useBoundStore((state) => state.startStopwatch);
  const resetStopwatch = useBoundStore((state) => state.resetStopwatch);
  const formatSwTime = useBoundStore((state) => state.formatSwTime);

  const restTimeExceeded =
    selectedExercise &&
    swElapsedTime > 0 &&
    swElapsedTime >= selectedExercise.targetRest;

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {swRunning ? (
        <IconButton
          size="large"
          color="error"
          aria-label="Reset Stopwatch"
          onClick={resetStopwatch}
        >
          <RestartAltIcon />
        </IconButton>
      ) : (
        <IconButton
          color="success"
          size="large"
          aria-label="Start Stopwatch"
          onClick={startStopwatch}
        >
          <PlayArrowIcon />
        </IconButton>
      )}

      <Box sx={{ ml: 1 }}>{formatSwTime(swElapsedTime)}</Box>

      {restTimeExceeded && (
        <IconButton size="large" color="warning" aria-label="Rest Time Passed">
          <WarningIcon />
        </IconButton>
      )}
    </Box>
  );
};
