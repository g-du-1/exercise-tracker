"use client";

import { Exercise } from "../types";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getYtVidId } from "../util/getYtVidId";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider";
import { Stopwatch } from "./Stopwatch";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  m: 1,
};

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const [showMoreInfo, setShowMoreInfo] = React.useState(false);
  const [selectedExercise, setSelectedExercise] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleAddClick = (selectedExercise: string) => {
    setSelectedExercise(selectedExercise);
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          zIndex: 1,
          background: "white",
          width: "100%",
          opacity: 0.9,
          left: "50%",
          transform: "translateX(-50%)",
          borderBottom: "1.5px solid #e8e8e8",
        }}
      >
        <Stopwatch />

        <IconButton
          size="large"
          aria-label="Show More Info"
          onClick={() => setShowMoreInfo(!showMoreInfo)}
        >
          <InfoIcon />
        </IconButton>
      </Box>

      <Box>
        {exercises.map((exercise, idx) => (
          <Box
            key={exercise.id}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box>{exercise.name}</Box>

              <IconButton
                size="large"
                aria-label="add"
                onClick={() => handleAddClick(exercise.name)}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {exercise.thumbLink &&
              (exercise.thumbLink.includes("youtube") ? (
                <Box
                  className="video-responsive"
                  sx={{ mb: 2 }}
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
                      : { width: "100%", height: "auto" }
                  }
                />
              ) : null)}

            {showMoreInfo && exercise.comments && (
              <Box
                dangerouslySetInnerHTML={{ __html: exercise.comments }}
                sx={{ width: "100%" }}
              />
            )}

            {exercises[idx + 1] &&
              exercise.category !== exercises[idx + 1].category && (
                <Divider flexItem data-testid="divider" sx={{ my: 1 }} />
              )}
          </Box>
        ))}
      </Box>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add {selectedExercise} Reps
          </Typography>

          {/* <Box sx={{ mt: 2 }}>Description placeholder</Box> */}
        </Box>
      </Modal>
    </>
  );
};
