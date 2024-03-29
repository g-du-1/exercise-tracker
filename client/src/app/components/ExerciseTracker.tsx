"use client";

import { Exercise } from "../types";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getYtVidId } from "../util/getYtVidId";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  const [selectedExercise, setSelectedExercise] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleAddClick = (selectedExercise: string) => {
    setSelectedExercise(selectedExercise);
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Box>
        {exercises.map((exercise) => (
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
              }}
            >
              <Box>{exercise.name}</Box>

              <IconButton
                aria-label="add"
                onClick={() => handleAddClick(exercise.name)}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {exercise.thumbLink &&
              (exercise.thumbLink.includes("youtube") ? (
                <div className="video-responsive">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYtVidId(exercise.thumbLink)}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${exercise.name} Video`}
                  />
                </div>
              ) : exercise.thumbLink.endsWith("jpg") ? (
                <img
                  src={exercise.thumbLink}
                  alt={`${exercise.name} Image`}
                  style={{ width: "100%", height: "auto" }}
                />
              ) : null)}
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
