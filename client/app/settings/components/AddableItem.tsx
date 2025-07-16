import { Exercise } from "../../types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const AddableItem = ({
  exercise,
  onClick,
  usersExerciseIds,
}: {
  exercise: Exercise;
  onClick: () => Promise<void>;
  usersExerciseIds: number[];
}) => (
  <Box my={1} display="flex" alignItems="center" justifyContent="space-between">
    <Typography fontSize={14}>{exercise.name}</Typography>

    <Button
      onClick={onClick}
      aria-label={`Add ${exercise.name}`}
      disabled={usersExerciseIds.includes(exercise.id)}
    >
      Add
    </Button>
  </Box>
);
