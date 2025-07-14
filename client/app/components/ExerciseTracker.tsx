"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Exercise } from "../types";
import { RepsModal } from "./RepsModal";
import { TopBar } from "./TopBar";
import { StartTime } from "./StartTime";
import { CardExerciseMedia } from "./card/CardExerciseMedia";
import { CardHeading } from "./card/CardHeading";
import { SavedReps } from "./card/SavedReps";
import { CardComments } from "./card/CardComments";
import { useBoundStore } from "../store/store";
import { FinishTime } from "./FinishTime";

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const showComments = useBoundStore((state) => state.showComments);
  const savedReps = useBoundStore((state) => state.savedReps);
  const showCompletedExercises = useBoundStore(
    (state) => state.showCompletedExercises,
  );
  const setSelectedExercise = useBoundStore(
    (state) => state.setSelectedExercise,
  );
  const setModalOpen = useBoundStore((state) => state.setModalOpen);

  const handleClick = (selectedExercise: Exercise) => {
    setSelectedExercise(selectedExercise);
    setModalOpen(true);
  };

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Box sx={{ mt: 7 }}>
        <TopBar />

        {exercises.map((exercise, idx) => {
          const exerciseCompleted =
            savedReps?.[exercise.key]?.reps.length >= exercise.targetSets;

          return (
            <Box
              key={exercise.key}
              sx={
                exerciseCompleted && !showCompletedExercises
                  ? { display: "none" }
                  : {}
              }
            >
              <Card sx={{ mb: 2 }}>
                <CardExerciseMedia exercise={exercise} />

                <CardContent
                  sx={{ p: 1, cursor: "pointer", "&:last-child": { pb: 1 } }}
                  aria-label={`Open ${exercise.name} Modal`}
                  onClick={() => handleClick(exercise)}
                >
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

        <FinishTime exercises={exercises} />

        <RepsModal exercises={exercises} />
      </Box>
    </Box>
  );
};
