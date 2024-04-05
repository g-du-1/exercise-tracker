import Box from "@mui/material/Box";
import { Exercise } from "app/types";
import { getYtVidId } from "../../util/getYtVidId";
import { useBoundStore } from "../../store/store";

export const CardExerciseMedia = ({ exercise }: { exercise: Exercise }) => {
  const showMedia = useBoundStore((state) => state.showMedia);

  return (
    <Box sx={{ borderBottom: "1px solid #e8e8e8" }}>
      {exercise.mediaLink &&
        (exercise.mediaLink.includes("youtube") ? (
          <Box
            className="video-responsive"
            sx={showMedia ? {} : { display: "none" }}
          >
            <iframe
              loading="lazy"
              src={`https://www.youtube.com/embed/${getYtVidId(
                exercise.mediaLink
              )}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${exercise.name} Video`}
            />
          </Box>
        ) : exercise.mediaLink.endsWith("jpg") ? (
          <img
            loading="lazy"
            src={exercise.mediaLink}
            alt={`${exercise.name} Image`}
            style={
              showMedia
                ? { width: "100%", height: "auto", display: "block" }
                : { display: "none" }
            }
          />
        ) : null)}
    </Box>
  );
};
