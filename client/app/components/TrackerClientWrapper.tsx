"use client";

import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrackerWrapper } from "./TrackerWrapper";

const queryClient = new QueryClient();

export const TrackerClientWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box
        sx={{
          p: 1,
        }}
      >
        <Box sx={{ mt: 7 }}>
          <TrackerWrapper />
        </Box>
      </Box>
    </QueryClientProvider>
  );
};
