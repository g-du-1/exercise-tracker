"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Exercise } from "../types";
import { getAllExercises } from "../util/api/getAllExercises";
import { useEffect, useState } from "react";

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
    <Box>
      <Box>Settings</Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          {allExercises.map((ex: Exercise) => (
            <Box key={ex.id}>{ex.name}</Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SettingsPage;
