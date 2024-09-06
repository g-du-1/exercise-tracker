"use client";

import { ExerciseTracker } from "./components/ExerciseTracker";
import Box from "@mui/material/Box";
import { getUserExercises } from "./util/api/getUserExercises";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: userExercises, isLoading: userExercisesLoading } = useQuery({
    queryKey: ["getUserExercises"],
    queryFn: getUserExercises,
  });

  if (userExercisesLoading) {
    return (
      <Box sx={{ display: "flex" }} justifyContent={"center"} mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Link href="/sign-in">
        <Button sx={{ mr: 2, mt: 8 }}>Sign In</Button>
      </Link>

      <Link href="/settings">
        <Button sx={{ mr: 2, mt: 8 }}>Settings</Button>
      </Link>

      <Box sx={{ mt: 7 }}>
        {userExercises && userExercises.length > 0 && (
          <ExerciseTracker exercises={userExercises.map((ue) => ue.exercise)} />
        )}
      </Box>
    </Box>
  );
}
