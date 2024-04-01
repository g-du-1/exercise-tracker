import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        zIndex: 1,
        background: "white",
        width: "100%",
        opacity: 0.9,
        left: "50%",
        transform: "translateX(-50%)",
        borderBottom: "1.5px solid #e8e8e8",
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
    </Box>
  );
};
