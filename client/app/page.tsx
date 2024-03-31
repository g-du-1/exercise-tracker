import { ExerciseTracker } from "./components/ExerciseTracker";
import { exercises } from "./constants";
import Box from "@mui/material/Box";

export default function Home() {
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
