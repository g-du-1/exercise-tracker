"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Exercise } from "../types";
import { RepsModal } from "./RepsModal";
import { TopBar } from "./TopBar";
import { useContext } from "react";
import { ExerciseTrackerContext } from "../context/ExerciseContext";
import { StartTime } from "./StartTime";
import { CardInfo } from "./card/CardInfo";
import { CardHeading } from "./card/CardHeading";
import { SavedReps } from "./card/SavedReps";

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const { showCompletedExercises, savedReps } = useContext(
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
            style={
              !showCompletedExercises && exerciseCompleted
                ? { display: "none" }
                : {}
            }
          >
            <Card sx={{ mb: 2 }}>
              <CardInfo exercise={exercise} />

              <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                <CardHeading
                  exercise={exercise}
                  exerciseCompleted={exerciseCompleted}
                />

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
