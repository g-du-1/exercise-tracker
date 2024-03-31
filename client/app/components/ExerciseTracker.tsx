"use client";

import { Exercise } from "../types";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DoneIcon from "@mui/icons-material/Done";
import WarningIcon from "@mui/icons-material/Warning";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { getStartTime } from "../util/getStartTime";

type SavedReps = {
  name: string;
  reps: number[];
};

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

const showCompletedLabel = {
  inputProps: { "aria-label": "Show Completed Exercises" },
};

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const [showCompletedExercises, setShowCompletedExercises] = useState(true);
  const [savedStartTime, setSavedStartTime] = useState("");
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

      if (!savedStartTime) {
        setSavedStartTime(getStartTime());
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

          {selectedExercise &&
            swElapsedTime > 0 &&
            swElapsedTime >= selectedExercise.targetRest && (
              <IconButton
                size="large"
                color="warning"
                aria-label="Rest Time Passed"
              >
                <WarningIcon />
              </IconButton>
            )}
        </Box>

        <Box>
          <Checkbox
            {...showCompletedLabel}
            color="default"
            checked={showCompletedExercises}
            onChange={() => setShowCompletedExercises(!showCompletedExercises)}
          />

          <IconButton
            size="large"
            aria-label="Show More Info"
            onClick={() => setShowMoreInfo(!showMoreInfo)}
          >
            <InfoIcon />
          </IconButton>
        </Box>
      </Box>

      {exercises.map((exercise, idx) => {
        const exerciseCompleted =
          savedReps?.[exercise.id]?.reps.length >= exercise.targetSets;

        return (
          <Box
            key={exercise.id}
            style={
              !showCompletedExercises && exerciseCompleted
                ? { display: "none" }
                : {}
            }
          >
            <Card sx={{ mb: 2 }}>
              <Box sx={{ borderBottom: "1px solid #e8e8e8" }}>
                {exercise.thumbLink &&
                  (exercise.thumbLink.includes("youtube") ? (
                    <Box
                      className="video-responsive"
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
                          : { width: "100%", height: "auto", display: "block" }
                      }
                    />
                  ) : null)}

                {showMoreInfo && exercise.comments && (
                  <Box
                    dangerouslySetInnerHTML={{ __html: exercise.comments }}
                    sx={{
                      fontSize: "12px",
                      p: 1,
                      lineHeight: 1.5,
                    }}
                  />
                )}
              </Box>

              <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
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
                        {`${exercise.targetSets}x${exercise.targetRepsMin ? `${exercise.targetRepsMin}` : ``}${exercise.targetRepsMax ? `-${exercise.targetRepsMax}` : ``}${exercise.isDuration ? `s` : ``}`}
                      </Box>

                      <Box sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {exercise.name}
                      </Box>
                    </Box>

                    {exerciseCompleted && (
                      <IconButton
                        color="success"
                        size="small"
                        aria-label="Done"
                      >
                        <DoneIcon />
                      </IconButton>
                    )}
                  </Box>

                  <IconButton
                    size="large"
                    aria-label="add"
                    onClick={() => handleAddClick(exercise)}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </Typography>

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
                        <Box sx={{ mr: 0.75, color: "#b9b9b9" }}>
                          Set {idx + 1}:
                        </Box>

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
              </CardContent>
            </Card>

            {exercises[idx + 1] &&
              exercise.category !== exercises[idx + 1].category && (
                <Divider
                  flexItem
                  data-testid="divider"
                  sx={{
                    mb: 2,
                    borderBottomWidth: 2,
                  }}
                />
              )}
          </Box>
        );
      })}

      {savedStartTime && (
        <Box textAlign={"center"} fontWeight={500} mb={1}>
          Started: {savedStartTime}
        </Box>
      )}

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
            label="Reps"
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
                onClick={() => {
                  const newReps = { ...savedReps };

                  const existingExercise = newReps[selectedExercise.id];

                  if (existingExercise) {
                    existingExercise.reps = [];
                  }

                  setSavedReps(newReps);
                  setModalOpen(false);
                  resetStopwatch();
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}

          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
