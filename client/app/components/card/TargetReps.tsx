import { Exercise } from "../../types";
import Box from "@mui/material/Box";

export const TargetReps = ({ exercise }: { exercise: Exercise }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ mr: 1, fontSize: "12px", color: "#b9b9b9" }}>
        {`${exercise.targetSets}x${exercise.targetRepsMin ? `${exercise.targetRepsMin}` : ``}${exercise.targetRepsMax ? `-${exercise.targetRepsMax}` : ``}${exercise.isDuration ? `s` : ``}`}
      </Box>

      <Box sx={{ fontSize: "14px", fontWeight: 500 }}>{exercise.name}</Box>
    </Box>
  );
};
