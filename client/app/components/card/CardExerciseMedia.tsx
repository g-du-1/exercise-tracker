import Box from "@mui/material/Box";
import { Exercise } from "app/types";
import { getYtVidId } from "../../util/getYtVidId";
import { useBoundStore } from "../../store/store";

const renderYouTubeVideo = (exercise: Exercise, showMedia: boolean) => {
  const videoId = getYtVidId(exercise.mediaLink);

  const visibleStyles = {};
  const hiddenStyles = { display: "none" };

  const wrapperStyles = showMedia ? visibleStyles : hiddenStyles;

  return (
    <Box className="video-responsive" sx={wrapperStyles}>
      <iframe
        loading="lazy"
        src={"https://www.youtube.com/embed/" + videoId}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={exercise.name + " Video"}
      />
    </Box>
  );
};

const renderImage = (exercise: Exercise, showMedia: boolean) => {
  const visibleStyles = { width: "100%", height: "auto", display: "block" };
  const hiddenStyles = { display: "none" };

  const style = showMedia ? visibleStyles : hiddenStyles;

  return (
    <img
      loading="lazy"
      src={exercise.mediaLink}
      alt={exercise.name + " Image"}
      style={style}
    />
  );
};

export const CardExerciseMedia = ({ exercise }: { exercise: Exercise }) => {
  const showMedia = useBoundStore((state) => state.showMedia);

  const isYoutubeVideo = exercise.mediaLink.includes("youtube");
  const isImage = exercise.mediaLink.endsWith("jpg");

  return (
    <Box sx={{ borderBottom: "1px solid #e8e8e8" }}>
      {isYoutubeVideo && renderYouTubeVideo(exercise, showMedia)}
      {isImage && renderImage(exercise, showMedia)}
    </Box>
  );
};
