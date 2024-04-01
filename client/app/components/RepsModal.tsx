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
import { useContext } from "react";
import { ExerciseTrackerContext } from "../context/ExerciseTrackerContext";

export const RepsModal = () => {
  const {
    selectedExercise,
    savedReps,
    setSavedReps,
    savedStartTime,
    setSavedStartTime,
    startStopwatch,
    resetStopwatch,
    fieldValue,
    setFieldValue,
    setModalOpen,
    modalOpen,
  } = useContext(ExerciseTrackerContext);

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
    }

    setSavedReps(newReps);
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
