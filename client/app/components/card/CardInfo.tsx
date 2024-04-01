import Box from "@mui/material/Box";
import { ExerciseTrackerContext } from "../../context/ExerciseTrackerContext";
import { useContext } from "react";
import { Exercise } from "app/types";
import { CardComments } from "./CardComments";
import { getYtVidId } from "../../util/getYtVidId";

export const CardInfo = ({ exercise }: { exercise: Exercise }) => {
  const { showMedia, showComments } = useContext(ExerciseTrackerContext);

  return (
    <Box sx={{ borderBottom: "1px solid #e8e8e8" }}>
      {exercise.thumbLink &&
        (exercise.thumbLink.includes("youtube") ? (
          <Box
            className="video-responsive"
            sx={showMedia ? {} : { display: "none" }}
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
              showMedia
                ? { width: "100%", height: "auto", display: "block" }
                : { display: "none" }
            }
          />
        ) : null)}

      {showComments && exercise.comments && (
        <CardComments comments={exercise.comments} />
      )}
    </Box>
  );
};
