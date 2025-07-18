import { useQuery } from "@tanstack/react-query";
import { APIError } from "../errors/APIError";
import { fetchWithAuth } from "../util/fetchWithAuth";
import { UserSettings } from "../types";

export const useGetUserSettings = () => {
  return useQuery<UserSettings, APIError>({
    queryKey: ["getUserSettings"],
    queryFn: async () => {
      return await fetchWithAuth(`/user-settings`);
    },
  });
};
