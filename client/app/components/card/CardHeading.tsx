import { Exercise } from "../../types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IconButton from "@mui/material/IconButton";
import { useBoundStore } from "../../store/store";

export const CardHeading = ({
  exercise,
  exerciseCompleted,
}: {
  exercise: Exercise;
  exerciseCompleted: boolean;
}) => {
  const setSelectedExercise = useBoundStore(
    (state) => state.setSelectedExercise
  );

  const setModalOpen = useBoundStore((state) => state.setModalOpen);

  const handleAddClick = (selectedExercise: Exercise) => {
    setSelectedExercise(selectedExercise);
    setModalOpen(true);
  };

  return (
    <Typography
      variant="h2"
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 1, fontSize: "12px", color: "#b9b9b9" }}>
            {`${exercise.targetSets}x${exercise.targetRepsMin ? `${exercise.targetRepsMin}` : ``}${exercise.targetRepsMax ? `-${exercise.targetRepsMax}` : ``}${exercise.isDuration ? `s` : ``}`}
          </Box>

          <Box sx={{ fontSize: "14px", fontWeight: 500 }}>{exercise.name}</Box>
        </Box>

        {exerciseCompleted && (
          <IconButton
            color="success"
            size="small"
            aria-label="Exercise Completed"
          >
            <DoneIcon />
          </IconButton>
        )}
      </Box>

      <IconButton
        size="large"
        aria-label="Open Modal"
        onClick={() => handleAddClick(exercise)}
      >
        <OpenInNewIcon />
      </IconButton>
    </Typography>
  );
};