"use client";

import { Exercise } from "../types";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import * as React from "react";
import { getYtVidId } from "../util/getYtVidId";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider";
import { Stopwatch } from "./Stopwatch";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from "@mui/icons-material/Clear";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  m: 1,
};

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const [fieldValue, setFieldValue] = React.useState("");
  const [savedReps, setSavedReps] = React.useState<{ [key: string]: any }>({});
  const [showMoreInfo, setShowMoreInfo] = React.useState(false);
  const [selectedExercise, setSelectedExercise] =
    React.useState<Exercise | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleAddClick = (selectedExercise: Exercise) => {
    setSelectedExercise(selectedExercise);
    setModalOpen(true);
  };

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
    }

    setModalOpen(false);
    setFieldValue("");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          zIndex: 1,
          background: "white",
          width: "100%",
          opacity: 0.9,
          left: "50%",
          transform: "translateX(-50%)",
          borderBottom: "1.5px solid #e8e8e8",
        }}
      >
        <Stopwatch />

        <IconButton
          size="large"
          aria-label="Show More Info"
          onClick={() => setShowMoreInfo(!showMoreInfo)}
        >
          <InfoIcon />
        </IconButton>
      </Box>

      <Box>
        {exercises.map((exercise, idx) => (
          <Box
            key={exercise.id}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box>{exercise.name}</Box>

                <Box>
                  {savedReps?.[exercise.id]?.reps?.length > 0 && (
                    <IconButton
                      color="error"
                      size="large"
                      aria-label="Delete Reps"
                      onClick={() => {
                        const newReps = { ...savedReps };

                        const existingExercise = newReps[exercise.id];

                        if (existingExercise) {
                          existingExercise.reps = [];
                        }

                        setSavedReps(newReps);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}

                  <IconButton
                    size="large"
                    aria-label="add"
                    onClick={() => handleAddClick(exercise)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box>
                {savedReps?.[exercise.id]?.reps.map((rep: number) => rep)}
              </Box>
            </Box>

            {exercise.thumbLink &&
              (exercise.thumbLink.includes("youtube") ? (
                <Box
                  className="video-responsive"
                  sx={{ mb: 2 }}
                  style={!showMoreInfo ? { display: "none" } : {}}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${getYtVidId(
                      exercise.thumbLink
                    )}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${exercise.name} Video`}
                  />
                </Box>
              ) : exercise.thumbLink.endsWith("jpg") ? (
                <img
                  src={exercise.thumbLink}
                  alt={`${exercise.name} Image`}
                  style={
                    !showMoreInfo
                      ? { display: "none" }
                      : { width: "100%", height: "auto" }
                  }
                />
              ) : null)}

            {showMoreInfo && exercise.comments && (
              <Box
                dangerouslySetInnerHTML={{ __html: exercise.comments }}
                sx={{ width: "100%" }}
              />
            )}

            {exercises[idx + 1] &&
              exercise.category !== exercises[idx + 1].category && (
                <Divider flexItem data-testid="divider" sx={{ my: 1 }} />
              )}
          </Box>
        ))}
      </Box>

      <React.Fragment>
        <Dialog open={modalOpen} onClose={handleModalClose} disableRestoreFocus>
          <DialogTitle>Add {selectedExercise?.name} Reps</DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Reps"
              type="number"
              fullWidth
              variant="standard"
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};
