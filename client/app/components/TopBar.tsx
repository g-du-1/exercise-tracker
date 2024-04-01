import PermMediaIcon from "@mui/icons-material/PermMedia";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import NotesIcon from "@mui/icons-material/Notes";
import { StopWatch } from "./StopWatch";
import { useContext } from "react";
import { ExerciseTrackerContext } from "../context/ExerciseTrackerContext";

export const TopBar = () => {
  const {
    showCompletedExercises,
    setShowCompletedExercises,
    showMedia,
    setShowMedia,
    showComments,
    setShowComments,
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
          aria-label="Toggle Comments"
          onClick={() => setShowComments(!showComments)}
        >
          <NotesIcon />
        </IconButton>

        <IconButton
          size="large"
          aria-label="Toggle Media"
          onClick={() => setShowMedia(!showMedia)}
        >
          <PermMediaIcon />
        </IconButton>
      </Box>
    </AppBar>
  );
};
