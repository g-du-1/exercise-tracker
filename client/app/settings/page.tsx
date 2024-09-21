"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Exercise } from "../types";
import { getAllExercises } from "../util/api/getAllExercises";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { saveUserExercise } from "../util/api/saveUserExercise";
import { deleteAllExercisesForUser } from "../util/api/deleteAllExercisesForUser";
import { getUserExercises } from "../util/api/getUserExercises";

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [usersExerciseIds, setUsersExerciseIds] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
        padding: 2,
      }}
    >
      <Typography variant="h6" component="h1" textAlign="center" mb={1}>
        Settings
      </Typography>

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
  );
};

export default SettingsPage;
