import Box from "@mui/material/Box";
import { ExerciseTrackerContext } from "../../context/ExerciseTrackerContext";
import { useContext } from "react";
import { Exercise } from "app/types";

type RepRange = "lower" | "inRange" | "higher";
type RepRangeMap = { [key in RepRange]: string };

const getRepRange = (
  targetRepsMin: number = 0,
  targetRepsMax: number = targetRepsMin,
  rep: number
): RepRange | null => {
  if (rep < targetRepsMin) {
    return "lower";
  } else if (rep >= targetRepsMin && rep <= targetRepsMax) {
    return "inRange";
  } else if (rep > targetRepsMax) {
    return "higher";
  }

  return null;
};

const getRepRangeLabel = (
  exercise: Exercise,
  rep: number,
  repRange: RepRange | null
): string => {
  const labels: RepRangeMap = {
    lower: `${exercise.name} ${rep} Reps Lower Than Range`,
    inRange: `${exercise.name} ${rep} Reps In Range`,
    higher: `${exercise.name} ${rep} Reps Higher Than Range`,
  };

  return repRange ? labels[repRange] : "";
};

export const SavedReps = ({ exercise }: { exercise: Exercise }) => {
  const { savedReps } = useContext(ExerciseTrackerContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        fontSize: "12px",
      }}
    >
      {savedReps?.[exercise.id]?.reps.map((rep: number, idx) => {
        const colorMap: RepRangeMap = {
          lower: "red",
          inRange: "green",
          higher: "orange",
        };

        const repRange = getRepRange(
          exercise.targetRepsMin,
          exercise.targetRepsMax,
          rep
        );

        return (
          <Box
            key={`${exercise.id}-${idx}`}
            sx={{
              display: "flex",
              flexDirection: "row",
              mr: 1,
              mb: 1.5,
            }}
          >
            <Box sx={{ mr: 0.75, color: "#b9b9b9" }}>Set {idx + 1}:</Box>

            <Box
              sx={{
                fontWeight: "500",
                color: repRange ? colorMap[repRange] : "",
              }}
              aria-label={getRepRangeLabel(exercise, rep, repRange)}
            >
              {rep}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
