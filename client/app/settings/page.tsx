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
import Divider from "@mui/material/Divider";
import { MainHeader } from "./components/MainHeader";
import { SubHeader } from "./components/SubHeader";
import { AddableItem } from "./components/AddableItem";

const SettingsPage = () => {
  const { data: allExercises } = useGetAllExercises();
  const { data: userExercises } = useGetUserExercises();

  const usersExerciseIds = userExercises?.map(
    (ex: UserExercise) => ex.exercise.id,
  );

  const deleteAllUserExercisesMutation = useDeleteAllExercisesForUser();
  const saveUserExerciseMutation = useSaveUserExercise();
  const warmups = allExercises?.filter((ex) => ex.category === "WARM_UP");

  const firstPairs = allExercises?.filter((ex) => ex.category === "FIRST_PAIR");
  const pullUps = firstPairs?.filter((ex) => ex.type === "PULL_UP");
  const squats = firstPairs?.filter((ex) => ex.type === "SQUAT");

  const secondPairs = allExercises?.filter(
    (ex) => ex.category === "SECOND_PAIR",
  );
  const dips = secondPairs?.filter((ex) => ex.type === "DIP");
  const hinge = secondPairs?.filter((ex) => ex.type === "HINGE");

  const thirdPairs = allExercises?.filter((ex) => ex.category === "THIRD_PAIR");
  const row = thirdPairs?.filter((ex) => ex.type === "ROW");
  const pushUp = thirdPairs?.filter((ex) => ex.type === "PUSH_UP");

  const coreTriplets = allExercises?.filter(
    (ex) => ex.category === "CORE_TRIPLET",
  );
  const antiExtension = coreTriplets?.filter(
    (ex) => ex.type === "ANTI_EXTENSION",
  );
  const antiRotation = coreTriplets?.filter(
    (ex) => ex.type === "ANTI_ROTATION",
  );
  const extension = coreTriplets?.filter((ex) => ex.type === "EXTENSION");

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
              <MainHeader text={"Warmup"} />

              {warmups?.map((ex: Exercise) => (
                <AddableItem
                  key={ex.id}
                  exercise={ex}
                  onClick={() => {
                    saveUserExerciseMutation.mutate(ex.id);
                  }}
                  usersExerciseIds={usersExerciseIds}
                />
              ))}

              <Divider sx={{ marginY: 4 }} />

              <MainHeader text={"First Pair"} />
              <SubHeader text={"Pull Ups"} />

              {pullUps?.map((ex: Exercise) => (
                <AddableItem
                  key={ex.id}
                  exercise={ex}
                  onClick={() => {
                    saveUserExerciseMutation.mutate(ex.id);
                  }}
                  usersExerciseIds={usersExerciseIds}
                />
              ))}

              <SubHeader text={"Squats"} />

              {squats?.map((ex: Exercise) => (
                <AddableItem
                  key={ex.id}
                  exercise={ex}
                  onClick={() => {
                    saveUserExerciseMutation.mutate(ex.id);
                  }}
                  usersExerciseIds={usersExerciseIds}
                />
              ))}

              <Divider sx={{ marginY: 4 }} />

              <MainHeader text={"Second Pair"} />
              <SubHeader text={"Dip"} />

              {dips?.map((ex: Exercise) => (
                <AddableItem
                  key={ex.id}
                  exercise={ex}
                  onClick={() => {
                    saveUserExerciseMutation.mutate(ex.id);
                  }}
                  usersExerciseIds={usersExerciseIds}
                />
              ))}

              <SubHeader text={"Hinge"} />

              {hinge?.map((ex: Exercise) => (
                <AddableItem
                  key={ex.id}
                  exercise={ex}
                  onClick={() => {
                    saveUserExerciseMutation.mutate(ex.id);
                  }}
                  usersExerciseIds={usersExerciseIds}
                />
              ))}

              <Divider sx={{ marginY: 4 }} />

              <MainHeader text={"Third Pair"} />
              <SubHeader text={"Row"} />

              {row?.map((ex: Exercise) => (
                <AddableItem
                  key={ex.id}
                  exercise={ex}
                  onClick={() => {
                    saveUserExerciseMutation.mutate(ex.id);
                  }}
                  usersExerciseIds={usersExerciseIds}
                />
              ))}

              <SubHeader text={"Push Up"} />

              {pushUp?.map((ex: Exercise) => (
                <AddableItem
                  key={ex.id}
                  exercise={ex}
                  onClick={() => {
                    saveUserExerciseMutation.mutate(ex.id);
                  }}
                  usersExerciseIds={usersExerciseIds}
                />
              ))}

              <Divider sx={{ marginY: 4 }} />

              <MainHeader text={"Core Triplet"} />
              <SubHeader text={"Anti Extension"} />

              {antiExtension?.map((ex: Exercise) => (
                <AddableItem
                  key={ex.id}
                  exercise={ex}
                  onClick={() => {
                    saveUserExerciseMutation.mutate(ex.id);
                  }}
                  usersExerciseIds={usersExerciseIds}
                />
              ))}

              <SubHeader text={"Anti Rotation"} />

              {antiRotation?.map((ex: Exercise) => (
                <AddableItem
                  key={ex.id}
                  exercise={ex}
                  onClick={() => {
                    saveUserExerciseMutation.mutate(ex.id);
                  }}
                  usersExerciseIds={usersExerciseIds}
                />
              ))}

              <SubHeader text={"Extension"} />

              {extension?.map((ex: Exercise) => (
                <AddableItem
                  key={ex.id}
                  exercise={ex}
                  onClick={() => {
                    saveUserExerciseMutation.mutate(ex.id);
                  }}
                  usersExerciseIds={usersExerciseIds}
                />
              ))}

              <Divider sx={{ marginY: 4 }} />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SettingsPage;
