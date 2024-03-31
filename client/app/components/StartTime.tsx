import { ExerciseTrackerContext } from "../context/ExerciseContext";
import { useContext } from "react";
import Box from "@mui/material/Box";

export const StartTime = () => {
  const { savedStartTime } = useContext(ExerciseTrackerContext);

  if (savedStartTime) {
    return (
      <Box textAlign={"center"} fontWeight={500} mb={1}>
        Started: {savedStartTime}
      </Box>
    );
  }

  return null;
};
