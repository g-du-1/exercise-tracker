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

  if (!selectedExercise) {
    return null;
  }

  const lastExercise = exercises[exercises.length - 1];
  const isLastExercise = lastExercise?.key === selectedExercise.key;

  const currentExerciseReps = savedReps[selectedExercise.key];
  const completedSetsCount = currentExerciseReps?.reps.length || 0;
  const targetSetsCount = selectedExercise.targetSets;
  const hasReachedTargetSets = completedSetsCount === targetSetsCount;

  const isWorkoutFinished = isLastExercise && hasReachedTargetSets;

  if (!isWorkoutFinished) {
    return null;
  }

  const finishTime = getFormattedTime();

  return (
    <Box textAlign={"center"} fontWeight={500} mb={1} mt={2}>
      Finished: {finishTime}
    </Box>
  );
};
