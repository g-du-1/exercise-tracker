"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrackerWrapper } from "./TrackerWrapper";

const queryClient = new QueryClient();

export const TrackerClientWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TrackerWrapper />
    </QueryClientProvider>
  );
};
