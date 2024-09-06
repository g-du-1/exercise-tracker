"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const customQueryClient = new QueryClient();

export const CustomQueryClient = ({ children }: any) => {
  return (
    <QueryClientProvider client={customQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
