import { ExerciseTracker } from "./components/ExerciseTracker";
import Box from "@mui/material/Box";
import { Exercise } from "./types";

const getExercises = async () => {
  // TODO Make it an env var
  const res = await fetch("http://localhost:8080/api/v1/exercises");

  return res.json();
};

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
