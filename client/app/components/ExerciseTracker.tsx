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

const CategoryHeader = ({ title }: { title: string }) => {
  return <Box my={2}>{title}</Box>;
};

const Exercises = ({ exercises }: { exercises: Exercise[] }) => {
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
    <>
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
    </>
  );
};

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const warmups = exercises.filter((ex) => ex.category === "WARM_UP");
  const firstPair = exercises.filter((ex) => ex.category === "FIRST_PAIR");
  const secondPair = exercises.filter((ex) => ex.category === "SECOND_PAIR");
  const thirdPair = exercises.filter((ex) => ex.category === "THIRD_PAIR");
  const coreTriplet = exercises.filter((ex) => ex.category === "CORE_TRIPLET");

  return (
    <>
      <TopBar />
      {warmups && warmups.length > 0 && (
        <>
          <CategoryHeader title={"Warmup"} />
          <Exercises exercises={warmups} />
        </>
      )}
      {firstPair && firstPair.length > 0 && (
        <>
          <CategoryHeader title={"First Pair"} />
          <Exercises exercises={firstPair} />
        </>
      )}
      {secondPair && secondPair.length > 0 && (
        <>
          <CategoryHeader title={"Second Pair"} />
          <Exercises exercises={secondPair} />
        </>
      )}
      {thirdPair && thirdPair.length > 0 && (
        <>
          <CategoryHeader title={"Third Pair"} />
          <Exercises exercises={thirdPair} />
        </>
      )}
      {coreTriplet && coreTriplet.length > 0 && (
        <>
          <CategoryHeader title={"Core Triplet"} />
          <Exercises exercises={coreTriplet} />
        </>
      )}
      `
      <StartTime />
      <FinishTime exercises={exercises} />
      <RepsModal exercises={exercises} />
    </>
  );
};
