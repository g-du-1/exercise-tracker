import { ExerciseTracker } from "./components/ExerciseTracker";
import { exercises } from "./constants";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign={"center"}
        sx={{ mt: "48px" }}
      >
        BWF Tracker
      </Typography>

      <ExerciseTracker exercises={exercises} />
    </Box>
  );
}
