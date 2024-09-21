"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Exercise, UserExercise } from "../types";
import { getAllExercises } from "../util/api/getAllExercises";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { saveUserExercise } from "../util/api/saveUserExercise";
import { deleteAllExercisesForUser } from "../util/api/deleteAllExercisesForUser";
import { getUserExercises } from "../util/api/getUserExercises";

const userHasExercise = (exerciseId: number, userExercises: UserExercise[]) => {
  return userExercises?.some((ue) => ue.exercise.id === exerciseId);
};

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [userExercises, setUserExercises] = useState<UserExercise[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [allExercises, allUserExercises] = await Promise.all([
        getAllExercises(),
        getUserExercises(),
      ]);

      setAllExercises(allExercises);
      setUserExercises(allUserExercises);

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
              onClick={async () => await deleteAllExercisesForUser()}
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
                  onClick={async () => await saveUserExercise(ex.id)}
                  aria-label={`Add ${ex.name}`}
                  disabled={userHasExercise(ex.id, userExercises)}
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
