"use client";

import { ExerciseTrackerContext } from "./context/ExerciseTrackerContext";
import { ExerciseTracker } from "./components/ExerciseTracker";
import { exercises } from "./constants";
import Box from "@mui/material/Box";
import { useExerciseTracker } from "./hooks/useExerciseTracker";

export default function Home() {
  const exerciseTracker = useExerciseTracker();

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Box sx={{ mt: 7 }}>
        <ExerciseTrackerContext.Provider value={exerciseTracker}>
          <ExerciseTracker exercises={exercises} />
        </ExerciseTrackerContext.Provider>
      </Box>
    </Box>
  );
}
