"use client";

import { ExerciseTrackerContext } from "./ExerciseContext";
import { ExerciseTracker } from "./components/ExerciseTracker";
import { exercises } from "./constants";
import Box from "@mui/material/Box";
import { useExerciseTracker } from "./hooks/useExerciseTracker";

export default function Home() {
  const exerciseTracker = useExerciseTracker();

  return (
    <ExerciseTrackerContext.Provider value={exerciseTracker}>
      <Box
        sx={{
          p: 1,
        }}
      >
        <Box sx={{ mt: 7 }}>
          <ExerciseTracker exercises={exercises} />
        </Box>
      </Box>
    </ExerciseTrackerContext.Provider>
  );
}
