import { Exercise } from "../../types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IconButton from "@mui/material/IconButton";

type Props = {
  exercise: Exercise;
  exerciseCompleted: boolean;
};

const buildTargetReps = (exercise: Exercise) => {
  const { targetSets, targetRepsMin, targetRepsMax, duration } = exercise;

  let targetFormat = `${targetSets}x${targetRepsMin}`;

  if (targetRepsMax && targetRepsMin !== targetRepsMax) {
    targetFormat += `-${targetRepsMax}`;
  }

  if (duration) {
    targetFormat += "s";
  }

  return targetFormat;
};

export const CardHeading = ({ exercise, exerciseCompleted }: Props) => {
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
            {buildTargetReps(exercise)}
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

      <IconButton size="large">
        <OpenInNewIcon />
      </IconButton>
    </Typography>
  );
};
