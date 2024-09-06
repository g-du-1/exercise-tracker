import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchWithAuth } from "../app/util/fetchWithAuth";
import { getAllExercises } from "../app/util/api/getAllExercises";
import { Exercise, UserExercise } from "../app/types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { getUserExercises } from "../app/util/api/getUserExercises";
import { CircularProgress } from "@mui/material";

const isExerciseSavedAlready = (
  exerciseId: number,
  userExercises: UserExercise[] | undefined,
) => {
  return userExercises?.some((ue) => ue.exercise.id === exerciseId);
};

const SettingsPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userExercises, setUserExercises] = useState<UserExercise[]>();
  const [exercises, setExercises] = useState<Exercise[]>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const [userExercises, exercises] = await Promise.all([
          getUserExercises(),
          getAllExercises(),
        ]);

        setUserExercises(userExercises);
        setExercises(exercises);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handeAddClick = async (exerciseId: number) => {
    const response = await fetchWithAuth("/user-exercises/save", {
      method: "POST",
      body: JSON.stringify({ exerciseId: exerciseId }),
    });

    const data: UserExercise = await response.json();

    setUserExercises(userExercises ? [...userExercises, data] : [data]);
  };

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
              onClick={() => handeAddClick(exercise.id)}
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
