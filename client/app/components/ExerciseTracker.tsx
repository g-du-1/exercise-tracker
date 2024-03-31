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

type RepRange = "lower" | "inRange" | "higher";
type RepRangeMap = { [key in RepRange]: string };

const getRepRange = (
  targetRepsMin: number = 0,
  targetRepsMax: number = targetRepsMin,
  rep: number
): RepRange | null => {
  if (rep < targetRepsMin) {
    return "lower";
  } else if (rep >= targetRepsMin && rep <= targetRepsMax) {
    return "inRange";
  } else if (rep > targetRepsMax) {
    return "higher";
  }

  return null;
};

const getRepRangeLabel = (
  exercise: Exercise,
  rep: number,
  repRange: RepRange | null
): string => {
  const labels: RepRangeMap = {
    lower: `${exercise.name} ${rep} Reps Lower Than Range`,
    inRange: `${exercise.name} ${rep} Reps In Range`,
    higher: `${exercise.name} ${rep} Reps Higher Than Range`,
  };

  return repRange ? labels[repRange] : "";
};

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const {
    showCompletedExercises,
    savedStartTime,
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
                  <Box
                    dangerouslySetInnerHTML={{ __html: exercise.comments }}
                    sx={{
                      fontSize: "12px",
                      p: 1,
                      lineHeight: 1.5,
                    }}
                  />
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

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "12px",
                  }}
                >
                  {savedReps?.[exercise.id]?.reps.map((rep: number, idx) => {
                    const colorMap: RepRangeMap = {
                      lower: "red",
                      inRange: "green",
                      higher: "orange",
                    };

                    const repRange = getRepRange(
                      exercise.targetRepsMin,
                      exercise.targetRepsMax,
                      rep
                    );

                    return (
                      <Box
                        key={`${exercise.id}-${idx}`}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          mr: 1,
                          mb: 1.5,
                        }}
                      >
                        <Box sx={{ mr: 0.75, color: "#b9b9b9" }}>
                          Set {idx + 1}:
                        </Box>

                        <Box
                          sx={{
                            fontWeight: "500",
                            color: repRange ? colorMap[repRange] : "",
                          }}
                          aria-label={getRepRangeLabel(exercise, rep, repRange)}
                        >
                          {rep}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
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

      {savedStartTime && (
        <Box textAlign={"center"} fontWeight={500} mb={1}>
          Started: {savedStartTime}
        </Box>
      )}

      <RepsModal />
    </>
  );
};
