"use client";

import { ExerciseTracker } from "./components/ExerciseTracker";
import Box from "@mui/material/Box";
import { getUserExercises } from "./util/api/getUserExercises";
import { UserExercise } from "./types";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userExercises, setUserExercises] = useState<UserExercise[]>();

  useEffect(() => {
    (async () => {
      setLoading(false);
      setUserExercises(await getUserExercises());
      setLoading(false);
    })();
  }, []);

  if (loading) {
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
