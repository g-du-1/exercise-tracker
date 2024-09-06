"use client";

import React from "react";
import Link from "next/link";
import { getAllExercises } from "../util/api/getAllExercises";
import { UserExercise } from "../types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { getUserExercises } from "../util/api/getUserExercises";
import { CircularProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveUserExercise } from "../util/api/saveUserExercise";

const isExerciseSavedAlready = (
  exerciseId: number,
  userExercises: UserExercise[] | undefined,
) => {
  return userExercises?.some((ue) => ue.exercise.id === exerciseId);
};

const SettingsPage = () => {
  const queryClient = useQueryClient();

  const { data: exercises, isLoading: allExercisesLoading } = useQuery({
    queryKey: ["getAllExercises"],
    queryFn: getAllExercises,
  });

  const { data: userExercises, isLoading: userExercisesLoading } = useQuery({
    queryKey: ["getUserExercises"],
    queryFn: getUserExercises,
  });

  const mutation = useMutation({
    mutationFn: async (exerciseId: number) => {
      return await saveUserExercise(exerciseId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getUserExercises"] });
    },
    onError: (error) => {
      console.error("Error adding exercise:", error);
    },
  });

  const loading = allExercisesLoading || userExercisesLoading;

  if (loading) {
    return (
      <Box sx={{ display: "flex" }} justifyContent={"center"} mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Link href="/">
        <Box mb={2}>
          <Button variant="contained">Home</Button>
        </Box>
      </Link>

      <Box>
        {exercises?.map((exercise) => (
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
            key={exercise.id}
          >
            <Box>{exercise.name}</Box>

            <Button
              disabled={isExerciseSavedAlready(exercise.id, userExercises)}
              onClick={() => mutation.mutate(exercise.id)}
            >
              Add
            </Button>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default SettingsPage;
