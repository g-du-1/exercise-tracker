import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Exercise } from "app/types";
import * as React from "react";
import { getStartTime } from "../util/getStartTime";
import { useBoundStore } from "../store/store";

export const RepsModal = () => {
  const fieldValue = useBoundStore((state) => state.fieldValue);
  const modalOpen = useBoundStore((state) => state.modalOpen);
  const savedReps = useBoundStore((state) => state.savedReps);
  const selectedExercise = useBoundStore((state) => state.selectedExercise);
  const savedStartTime = useBoundStore((state) => state.savedStartTime);
  const setFieldValue = useBoundStore((state) => state.setFieldValue);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const setSavedReps = useBoundStore((state) => state.setSavedReps);
  const startStopwatch = useBoundStore((state) => state.startStopwatch);
  const resetStopwatch = useBoundStore((state) => state.resetStopwatch);
  const setSavedStartTime = useBoundStore((state) => state.setSavedStartTime);

  const handleModalClose = () => {
    const fieldValNum = parseInt(fieldValue);

    if (selectedExercise && fieldValNum) {
      const newReps = { ...savedReps };

      const exercise = newReps[selectedExercise.id];

      if (exercise) {
        exercise.reps.push(parseInt(fieldValue));
      } else {
        newReps[selectedExercise.id] = {
          name: selectedExercise.name,
          reps: [fieldValNum],
        };
      }

      setSavedReps(newReps);

      if (selectedExercise.category !== "warmup") {
        resetStopwatch();
        startStopwatch();
      }

      if (!savedStartTime) {
        setSavedStartTime(getStartTime());
      }
    }

    setModalOpen(false);
    setFieldValue("");
  };

  const handleDeleteRepsClick = (selectedExercise: Exercise) => {
    const newReps = { ...savedReps };

    const existingExercise = newReps[selectedExercise.id];

    if (existingExercise) {
      existingExercise.reps = [];

      setSavedReps(newReps);
    }

    setModalOpen(false);
    resetStopwatch();
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleModalClose}
      disableRestoreFocus
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleModalClose();
        },
      }}
    >
      <DialogTitle>Add {selectedExercise?.name} Reps</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Add Reps"
          type="number"
          fullWidth
          variant="standard"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        {selectedExercise &&
          savedReps?.[selectedExercise.id]?.reps?.length > 0 && (
            <IconButton
              color="error"
              size="large"
              aria-label="Delete Reps"
              onClick={() => handleDeleteRepsClick(selectedExercise)}
            >
              <DeleteIcon />
            </IconButton>
          )}

        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};