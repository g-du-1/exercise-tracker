"use client";

import DoneIcon from "@mui/icons-material/Done";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Exercise } from "../types";
import { getYtVidId } from "../util/getYtVidId";
import { RepsModal } from "./RepsModal";
import { TopBar } from "./TopBar";
import { useContext } from "react";
import { FormModalContext } from "../context/formModalContext";
import { ExerciseTrackerContext } from "../context/ExerciseContext";
import { StartTime } from "./StartTime";
import { CardComments } from "./card/CardComments";
import { SavedReps } from "./card/SavedReps";

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const {
    showCompletedExercises,
    savedReps,
    setSelectedExercise,
    showMoreInfo,
  } = useContext(ExerciseTrackerContext);

  const { setModalOpen } = useContext(FormModalContext);

  const handleAddClick = (selectedExercise: Exercise) => {
    setSelectedExercise(selectedExercise);
    setModalOpen(true);
  };

  return (
    <>
      <TopBar />

      {exercises.map((exercise, idx) => {
        const exerciseCompleted =
          savedReps?.[exercise.id]?.reps.length >= exercise.targetSets;

        return (
          <Box
            key={exercise.id}
            style={
              !showCompletedExercises && exerciseCompleted
                ? { display: "none" }
                : {}
            }
          >
            <Card sx={{ mb: 2 }}>
              <Box sx={{ borderBottom: "1px solid #e8e8e8" }}>
                {exercise.thumbLink &&
                  (exercise.thumbLink.includes("youtube") ? (
                    <Box
                      className="video-responsive"
                      style={!showMoreInfo ? { display: "none" } : {}}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${getYtVidId(
                          exercise.thumbLink
                        )}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${exercise.name} Video`}
                      />
                    </Box>
                  ) : exercise.thumbLink.endsWith("jpg") ? (
                    <img
                      src={exercise.thumbLink}
                      alt={`${exercise.name} Image`}
                      style={
                        !showMoreInfo
                          ? { display: "none" }
                          : { width: "100%", height: "auto", display: "block" }
                      }
                    />
                  ) : null)}

                {showMoreInfo && exercise.comments && (
                  <CardComments comments={exercise.comments} />
                )}
              </Box>

              <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ mr: 1, fontSize: "12px", color: "#b9b9b9" }}>
                        {`${exercise.targetSets}x${exercise.targetRepsMin ? `${exercise.targetRepsMin}` : ``}${exercise.targetRepsMax ? `-${exercise.targetRepsMax}` : ``}${exercise.isDuration ? `s` : ``}`}
                      </Box>

                      <Box sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {exercise.name}
                      </Box>
                    </Box>

                    {exerciseCompleted && (
                      <IconButton
                        color="success"
                        size="small"
                        aria-label="Exercise Completed"
                      >
                        <DoneIcon />
                      </IconButton>
                    )}
                  </Box>

                  <IconButton
                    size="large"
                    aria-label="Open Modal"
                    onClick={() => handleAddClick(exercise)}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </Typography>

                <SavedReps exercise={exercise} />
              </CardContent>
            </Card>

            {exercises[idx + 1] &&
              exercise.category !== exercises[idx + 1].category && (
                <Divider
                  flexItem
                  data-testid="divider"
                  sx={{
                    mb: 2,
                    borderBottomWidth: 2,
                  }}
                />
              )}
          </Box>
        );
      })}

      <StartTime />

      <RepsModal />
    </>
  );
};
