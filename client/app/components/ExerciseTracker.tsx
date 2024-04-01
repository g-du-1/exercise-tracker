"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Exercise } from "../types";
import { RepsModal } from "./RepsModal";
import { TopBar } from "./TopBar";
import { useContext } from "react";
import { ExerciseTrackerContext } from "../context/ExerciseTrackerContext";
import { StartTime } from "./StartTime";
import { CardExerciseMedia } from "./card/CardExerciseMedia";
import { CardHeading } from "./card/CardHeading";
import { SavedReps } from "./card/SavedReps";
import { CardComments } from "./card/CardComments";

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const { showCompletedExercises, savedReps, showComments } = useContext(
    ExerciseTrackerContext
  );

  return (
    <>
      <TopBar />

      {exercises.map((exercise, idx) => {
        const exerciseCompleted =
          savedReps?.[exercise.id]?.reps.length >= exercise.targetSets;

        return (
          <Box
            key={exercise.id}
            sx={
              exerciseCompleted && !showCompletedExercises
                ? { display: "none" }
                : {}
            }
          >
            <Card sx={{ mb: 2 }}>
              <CardExerciseMedia exercise={exercise} />

              <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                <CardHeading
                  exercise={exercise}
                  exerciseCompleted={exerciseCompleted}
                />

                <SavedReps exercise={exercise} />

                {showComments && exercise.comments && (
                  <CardComments comments={exercise.comments} />
                )}
              </CardContent>
            </Card>

            {exercises[idx + 1] &&
              exercise.category !== exercises[idx + 1].category && (
                <Divider
                  flexItem
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
