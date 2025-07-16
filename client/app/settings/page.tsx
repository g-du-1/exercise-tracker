"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Exercise } from "../types";
import { getAllExercises } from "../util/api/getAllExercises";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { saveUserExercise } from "../util/api/saveUserExercise";
import { deleteAllExercisesForUser } from "../util/api/deleteAllExercisesForUser";
import { getUserExercises } from "../util/api/getUserExercises";
import { TopBar } from "../components/TopBar";

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [usersExerciseIds, setUsersExerciseIds] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const [allExercises, allUserExercises] = await Promise.all([
        getAllExercises(),
        getUserExercises(),
      ]);

      setAllExercises(allExercises);
      setUsersExerciseIds(allUserExercises.map((ue) => ue.exercise.id));

      setLoading(false);
    })();
  }, []);

  return (
    <>
      <TopBar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
          marginTop: 7,
          padding: 2,
        }}
      >
        {loading ? (
          <Box mx="auto" my={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column">
            <Box ml="auto">
              <Button
                onClick={async () => {
                  await deleteAllExercisesForUser();
                  setUsersExerciseIds([]);
                }}
                color="error"
                aria-label="Delete All Of My Exercises"
              >
                Delete All
              </Button>
            </Box>

            <Box>
              {allExercises.map((ex: Exercise) => (
                <Box
                  key={ex.id}
                  my={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>{ex.name}</Box>

                  <Button
                    onClick={async () => {
                      await saveUserExercise(ex.id);
                      setUsersExerciseIds([...usersExerciseIds, ex.id]);
                    }}
                    aria-label={`Add ${ex.name}`}
                    disabled={usersExerciseIds.includes(ex.id)}
                  >
                    Add
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SettingsPage;
