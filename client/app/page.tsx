import { ExerciseTracker } from "./components/ExerciseTracker";
import Box from "@mui/material/Box";
import { exercises } from "./constants";

export default async function Home() {
  // TODO: Load exercises from the server when it's been set up
  // const exercises: Exercise[] = await getExercises();

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
