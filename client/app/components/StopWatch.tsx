import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StopIcon from "@mui/icons-material/Stop";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useBoundStore } from "../store/store";
import { useEffect, useState } from "react";

export const StopWatch = () => {
  const [alertSound, setAlertSound] = useState<HTMLAudioElement | null>(null);
  const [errorSound, setErrorSound] = useState<HTMLAudioElement | null>(null);

  const selectedExercise = useBoundStore((state) => state.selectedExercise);
  const swRunning = useBoundStore((state) => state.swRunning);
  const swElapsedTime = useBoundStore((state) => state.swElapsedTime);
  const startStopwatch = useBoundStore((state) => state.startStopwatch);
  const resetStopwatch = useBoundStore((state) => state.resetStopwatch);
  const formatSwTime = useBoundStore((state) => state.formatSwTime);

  const restTimePassed =
    selectedExercise &&
    selectedExercise.category !== "WARM_UP" &&
    swElapsedTime > 0 &&
    swElapsedTime >= selectedExercise.targetRest;

  const addtlRestTimePassed =
    restTimePassed &&
    swElapsedTime >=
      selectedExercise.targetRest + selectedExercise.additionalRest;

  useEffect(() => {
    setAlertSound(new Audio("/alert.mp3"));
    setErrorSound(new Audio("/error.mp3"));
  }, []);

  useEffect(() => {
    if (restTimePassed) {
      alertSound?.play();
    }
  }, [restTimePassed]);

  useEffect(() => {
    if (addtlRestTimePassed) {
      errorSound?.play();
    }
  }, [addtlRestTimePassed]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <IconButton
        size="large"
        color="success"
        aria-label="Restart Stopwatch"
        onClick={() => {
          resetStopwatch();
          startStopwatch();
        }}
      >
        <RestartAltIcon />
      </IconButton>

      <IconButton
        size="large"
        color="error"
        disabled={!swRunning}
        aria-label="Stop Stopwatch"
        onClick={resetStopwatch}
      >
        <StopIcon />
      </IconButton>

      <Box sx={{ ml: 1 }}>{formatSwTime(swElapsedTime)}</Box>

      {restTimePassed && (
        <Box
          ml={1}
          display={"flex"}
          alignItems={"center"}
          aria-label={
            addtlRestTimePassed
              ? "Additional Rest Time Passed"
              : "Rest Time Passed"
          }
        >
          <WarningIcon color={addtlRestTimePassed ? "error" : "warning"} />
        </Box>
      )}
    </Box>
  );
};
