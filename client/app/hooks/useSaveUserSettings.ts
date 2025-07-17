import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "../util/fetchWithAuth";
import { UserSettings } from "../types";

export const useSaveUserSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userSettings: UserSettings) => {
      return await fetchWithAuth("/user-settings/save", {
        method: "POST",
        body: JSON.stringify(userSettings),
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["getUserSettings"], data);
      queryClient.invalidateQueries({ queryKey: ["getUserSettings"] });
    },
  });
};
