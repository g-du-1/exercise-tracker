import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";
import SettingsPage from "./page";
import { useRouter } from "next/navigation";
import { Mock } from "vitest";
import {
  allExercises,
  deleteAllExercises,
  nockBaseUrl,
  saveExercise,
  userExercises,
} from "../nockFixtures";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("SettingsPage", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_ENABLE_API_CONNECTION = "true";

    (useRouter as Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("displays a spinner and loads exercises", async () => {
    nock(nockBaseUrl)
      .get(allExercises.path)
      .reply(allExercises.success.status, allExercises.success.response);

    render(<SettingsPage />, { wrapper });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    expect(screen.queryByText("Diamond Pushup")).not.toBeInTheDocument();

    expect(
      screen.queryByText("Reverse Hyperextension"),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Diamond Pushup")).toBeInTheDocument();
    });
    expect(screen.getByLabelText("Add Diamond Pushup")).toBeInTheDocument();

    expect(screen.getByText("Reverse Hyperextension")).toBeInTheDocument();

    expect(
      screen.getByLabelText("Add Reverse Hyperextension"),
    ).toBeInTheDocument();

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("adds a user exercise and disables add", async () => {
    nock(nockBaseUrl)
      .get(allExercises.path)
      .reply(allExercises.success.status, allExercises.success.response)
      .get(userExercises.path)
      .reply(userExercises.success.status, [])
      .post(saveExercise.path)
      .reply(saveExercise.success.status, {
        id: 6,
        exercise: {
          id: 13,
          key: "diamond-pushup",
          name: "Diamond Pushup",
          category: "THIRD_PAIR",
          type: "PUSH_UP",
          targetSets: 3,
          targetRepsMin: 5,
          targetRepsMax: 8,
          targetRest: 90,
          additionalRest: 90,
          mediaLink: "https://www.youtube.com/watch?v=J0DnG1_S92I",
          comments:
            "<ul><li>Put your hands close together so the thumbs and index fingers touch, then perform a pushup</li><li>If this is too difficult or feels uncomfortable, put your hands just a bit closer than in a normal pushup. Work on moving the hands closer together over time until you reach diamond pushups</li></ul>",
          duration: false,
        },
      })
      .get(userExercises.path)
      .reply(userExercises.success.status, [
        {
          id: 6,
          exercise: {
            id: 13,
            key: "diamond-pushup",
            name: "Diamond Pushup",
            category: "THIRD_PAIR",
            type: "PUSH_UP",
            targetSets: 3,
            targetRepsMin: 5,
            targetRepsMax: 8,
            targetRest: 90,
            additionalRest: 90,
            mediaLink: "https://www.youtube.com/watch?v=J0DnG1_S92I",
            comments:
              "<ul><li>Put your hands close together so the thumbs and index fingers touch, then perform a pushup</li><li>If this is too difficult or feels uncomfortable, put your hands just a bit closer than in a normal pushup. Work on moving the hands closer together over time until you reach diamond pushups</li></ul>",
            duration: false,
          },
        },
      ]);

    render(<SettingsPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("Diamond Pushup")).toBeInTheDocument();
    });

    await waitFor(async () => {
      await fireEvent.click(screen.getByLabelText("Add Diamond Pushup"));
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Add Diamond Pushup")).toBeDisabled();
    });
  });

  it("deletes all exercises for user", async () => {
    nock(nockBaseUrl)
      .get(allExercises.path)
      .reply(allExercises.success.status, allExercises.success.response)
      .get(userExercises.path)
      .reply(userExercises.success.status, [
        {
          id: 6,
          exercise: {
            id: 13,
            key: "diamond-pushup",
            name: "Diamond Pushup",
            category: "THIRD_PAIR",
            type: "PUSH_UP",
            targetSets: 3,
            targetRepsMin: 5,
            targetRepsMax: 8,
            targetRest: 90,
            additionalRest: 90,
            mediaLink: "https://www.youtube.com/watch?v=J0DnG1_S92I",
            comments:
              "<ul><li>Put your hands close together so the thumbs and index fingers touch, then perform a pushup</li><li>If this is too difficult or feels uncomfortable, put your hands just a bit closer than in a normal pushup. Work on moving the hands closer together over time until you reach diamond pushups</li></ul>",
            duration: false,
          },
        },
      ])
      .delete(deleteAllExercises.path)
      .reply(
        deleteAllExercises.success.status,
        deleteAllExercises.success.response,
      )
      .get(userExercises.path)
      .reply(userExercises.success.status, [])
      .post(saveExercise.path)
      .reply(saveExercise.success.status, {
        id: 6,
        exercise: {
          id: 13,
          key: "diamond-pushup",
          name: "Diamond Pushup",
          category: "THIRD_PAIR",
          type: "PUSH_UP",
          targetSets: 3,
          targetRepsMin: 5,
          targetRepsMax: 8,
          targetRest: 90,
          additionalRest: 90,
          mediaLink: "https://www.youtube.com/watch?v=J0DnG1_S92I",
          comments:
            "<ul><li>Put your hands close together so the thumbs and index fingers touch, then perform a pushup</li><li>If this is too difficult or feels uncomfortable, put your hands just a bit closer than in a normal pushup. Work on moving the hands closer together over time until you reach diamond pushups</li></ul>",
          duration: false,
        },
      })
      .get(userExercises.path)
      .reply(userExercises.success.status, [
        {
          id: 6,
          exercise: {
            id: 13,
            key: "diamond-pushup",
            name: "Diamond Pushup",
            category: "THIRD_PAIR",
            type: "PUSH_UP",
            targetSets: 3,
            targetRepsMin: 5,
            targetRepsMax: 8,
            targetRest: 90,
            additionalRest: 90,
            mediaLink: "https://www.youtube.com/watch?v=J0DnG1_S92I",
            comments:
              "<ul><li>Put your hands close together so the thumbs and index fingers touch, then perform a pushup</li><li>If this is too difficult or feels uncomfortable, put your hands just a bit closer than in a normal pushup. Work on moving the hands closer together over time until you reach diamond pushups</li></ul>",
            duration: false,
          },
        },
      ]);

    render(<SettingsPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByLabelText("Add Diamond Pushup")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Add Diamond Pushup")).toBeDisabled();
    });

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText("Delete All Of My Exercises"));
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Add Diamond Pushup")).toBeEnabled();
    });
  });
});
