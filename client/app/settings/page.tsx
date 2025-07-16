"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Exercise, UserExercise } from "../types";
import Button from "@mui/material/Button";
import { TopBar } from "../components/TopBar";
import { useGetUserExercises } from "../hooks/useGetUserExercises";
import { useGetAllExercises } from "../hooks/useGetAllExercises";
import { useDeleteAllExercisesForUser } from "../hooks/useDeleteAllExercisesForUser";
import { useSaveUserExercise } from "../hooks/useSaveUserExercise";

const SettingsPage = () => {
  const { data: allExercises } = useGetAllExercises();
  const { data: userExercises } = useGetUserExercises();

  const deleteAllUserExercisesMutation = useDeleteAllExercisesForUser();
  const saveUserExerciseMutation = useSaveUserExercise();

  const usersExerciseIds = userExercises?.map(
    (ex: UserExercise) => ex.exercise.id,
  );

  const loading = !allExercises;

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
                onClick={() => {
                  deleteAllUserExercisesMutation.mutate();
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
                    onClick={() => {
                      saveUserExerciseMutation.mutate(ex.id);
                    }}
                    aria-label={`Add ${ex.name}`}
                    disabled={usersExerciseIds?.includes(ex.id)}
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
