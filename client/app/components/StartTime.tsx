import Box from "@mui/material/Box";
import { useBoundStore } from "../store/store";

export const StartTime = () => {
  const savedStartTime = useBoundStore((state) => state.savedStartTime);

  if (savedStartTime) {
    return (
      <Box textAlign={"center"} fontWeight={500} mb={1}>
        Started: {savedStartTime}
      </Box>
    );
  }

  return null;
};
