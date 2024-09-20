"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Exercise } from "../types";
import { getAllExercises } from "../util/api/getAllExercises";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const allExercises = await getAllExercises();
      setAllExercises(allExercises);
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

              <Button aria-label={`Add ${ex.name}`}>Add</Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SettingsPage;
