import Box from "@mui/material/Box";
import { useBoundStore } from "../store/store";
import { getFormattedTime } from "../util/getFormattedTime";
import { Exercise } from "../types";

type Props = {
  exercises: Exercise[];
};

export const FinishTime = ({ exercises }: Props) => {
  const selectedExercise = useBoundStore((state) => state.selectedExercise);
  const savedReps = useBoundStore((state) => state.savedReps);

  const isLastExercise =
    exercises[exercises.length - 1].key === selectedExercise?.key;

  const reachedTargetSets =
    selectedExercise &&
    savedReps[selectedExercise.key]?.reps.length === selectedExercise.targetSets;

  const workoutFinished = isLastExercise && reachedTargetSets;

  if (workoutFinished) {
    return (
      <Box textAlign={"center"} fontWeight={500} mb={1} mt={2}>
        Finished: {getFormattedTime()}
      </Box>
    );
  }

  return null;
};
