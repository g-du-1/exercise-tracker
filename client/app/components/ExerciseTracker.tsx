"use client";

import { Exercise } from "../types";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import * as React from "react";
import { getYtVidId } from "../util/getYtVidId";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from "@mui/icons-material/Clear";
import { useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DoneIcon from "@mui/icons-material/Done";

type SavedReps = {
  name: string;
  reps: number[];
};

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const [fieldValue, setFieldValue] = useState("");
  const [savedReps, setSavedReps] = useState<{
    [key: string]: SavedReps;
  }>({});
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const [swRunning, setSwRunning] = useState(false);
  const [swElapsedTime, setSwElapsedTime] = useState(0);
  const swIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStopwatch = () => {
    setSwRunning(true);

    swIntervalRef.current = setInterval(() => {
      setSwElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);
  };

  const resetStopwatch = () => {
    if (swIntervalRef.current) clearInterval(swIntervalRef.current);

    setSwElapsedTime(0);
    setSwRunning(false);
  };

  const formatSwTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

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

      if (selectedExercise.category !== "warmup") {
        resetStopwatch();
        startStopwatch();
      }
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
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton
            color="success"
            size="large"
            aria-label="Start Stopwatch"
            disabled={swRunning}
            onClick={startStopwatch}
          >
            <PlayArrowIcon />
          </IconButton>

          <IconButton
            size="large"
            color="error"
            aria-label="Reset Stopwatch"
            disabled={!swRunning}
            onClick={resetStopwatch}
          >
            <RestartAltIcon />
          </IconButton>

          <Box sx={{ ml: 1 }}>{formatSwTime(swElapsedTime)}</Box>
        </Box>

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
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box>{exercise.name}</Box>

                  {savedReps?.[exercise.id]?.reps.length >=
                    exercise.targetSets && (
                    <IconButton color="success" size="small" aria-label="Done">
                      <DoneIcon />
                    </IconButton>
                  )}
                </Box>

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

              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {savedReps?.[exercise.id]?.reps.map((rep: number, idx) => (
                  <Box
                    key={`${exercise.id}-${idx}`}
                    sx={{ display: "flex", flexDirection: "row", mr: 1, mb: 2 }}
                  >
                    <Box sx={{ mr: 0.75, color: "#b9b9b9" }}>
                      Set {idx + 1}:
                    </Box>

                    <Box sx={{ fontWeight: "500" }}>{rep}</Box>
                  </Box>
                ))}
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
    </>
  );
};
