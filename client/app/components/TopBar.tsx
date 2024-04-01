import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import { StopWatch } from "./StopWatch";
import { useContext } from "react";
import { ExerciseTrackerContext } from "../context/ExerciseTrackerContext";

export const TopBar = () => {
  const {
    showCompletedExercises,
    setShowCompletedExercises,
    showMoreInfo,
    setShowMoreInfo,
  } = useContext(ExerciseTrackerContext);

  const showCompletedLabel = {
    inputProps: { "aria-label": "Show Completed Exercises" },
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        opacity: 0.9,
        color: "text.primary",
        background: "#fff",
      }}
    >
      <StopWatch />

      <Box>
        <Checkbox
          {...showCompletedLabel}
          color="default"
          checked={showCompletedExercises}
          onChange={() => setShowCompletedExercises(!showCompletedExercises)}
        />

        <IconButton
          size="large"
          aria-label="Show More Info"
          onClick={() => setShowMoreInfo(!showMoreInfo)}
        >
          <InfoIcon />
        </IconButton>
      </Box>
    </AppBar>
  );
};
