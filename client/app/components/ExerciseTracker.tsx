"use client";

import DoneIcon from "@mui/icons-material/Done";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Exercise } from "../types";
import { RepsModal } from "./RepsModal";
import { TopBar } from "./TopBar";
import { useContext } from "react";
import { FormModalContext } from "../context/formModalContext";
import { ExerciseTrackerContext } from "../context/ExerciseContext";
import { StartTime } from "./StartTime";
import { SavedReps } from "./card/SavedReps";
import { CardInfo } from "./card/CardInfo";
import { TargetReps } from "./card/TargetReps";

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const { showCompletedExercises, savedReps, setSelectedExercise } = useContext(
    ExerciseTrackerContext
  );

  const { setModalOpen } = useContext(FormModalContext);

  const handleAddClick = (selectedExercise: Exercise) => {
    setSelectedExercise(selectedExercise);
    setModalOpen(true);
  };

  return (
    <>
      <TopBar />

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
              <CardInfo exercise={exercise} />

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
                    <TargetReps exercise={exercise} />

                    {exerciseCompleted && (
                      <IconButton
                        color="success"
                        size="small"
                        aria-label="Exercise Completed"
                      >
                        <DoneIcon />
                      </IconButton>
                    )}
                  </Box>

                  <IconButton
                    size="large"
                    aria-label="Open Modal"
                    onClick={() => handleAddClick(exercise)}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </Typography>

                <SavedReps exercise={exercise} />
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

      <StartTime />

      <RepsModal />
    </>
  );
};
