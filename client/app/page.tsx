"use client";

import { ExerciseTrackerContext } from "./context/ExerciseContext";
import { ExerciseTracker } from "./components/ExerciseTracker";
import { exercises } from "./constants";
import Box from "@mui/material/Box";
import { useExerciseTracker } from "./hooks/useExerciseTracker";
import { StopwatchContext } from "./context/StopwatchContext";
import { useStopwatch } from "./hooks/useStopwatch";
import { FormModalContext } from "./context/formModalContext";
import { useFormModal } from "./hooks/useFormModal";

export default function Home() {
  const exerciseTracker = useExerciseTracker();
  const stopwatch = useStopwatch();
  const formModal = useFormModal();

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Box sx={{ mt: 7 }}>
        <ExerciseTrackerContext.Provider value={exerciseTracker}>
          <StopwatchContext.Provider value={stopwatch}>
            <FormModalContext.Provider value={formModal}>
              <ExerciseTracker exercises={exercises} />
            </FormModalContext.Provider>
          </StopwatchContext.Provider>
        </ExerciseTrackerContext.Provider>
      </Box>
    </Box>
  );
}
