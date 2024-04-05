import { ExerciseTracker } from "./components/ExerciseTracker";
import Box from "@mui/material/Box";
import { Exercise } from "./types";
import { getExercises } from "./util/getExercises";

export default async function Home() {
  const exercises: Exercise[] = await getExercises();

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Box sx={{ mt: 7 }}>
        <ExerciseTracker exercises={exercises} />
      </Box>
    </Box>
  );
}
