import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import SettingsPage from "./page";
import { Mock } from "vitest";
import { useRouter } from "next/navigation";
import { useGetAllExercises } from "../hooks/useGetAllExercises";
import { useGetUserExercises } from "../hooks/useGetUserExercises";
import { useDeleteAllExercisesForUser } from "../hooks/useDeleteAllExercisesForUser";
import { useSaveUserExercise } from "../hooks/useSaveUserExercise";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockPush = vi.fn();
const mockDeleteAllExercisesForUser = vi.fn();
const mockSaveUserExercise = vi.fn();

const mockExercises = [
  {
    id: 16,
    key: "reverse-hyperextension",
    name: "Reverse Hyperextension",
    category: "CORE_TRIPLET",
    type: "EXTENSION",
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    targetRest: 60,
    additionalRest: 60,
    mediaLink: "https://www.youtube.com/watch?v=ZeRsNzFcQLQ&",
    comments: "<ul><li>Keep your butt tucked</li></ul>",
    duration: false,
  },
  {
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
];

vi.mock("../hooks/useGetAllExercises", () => ({
  useGetAllExercises: vi.fn(),
}));

vi.mock("../hooks/useGetUserExercises", () => ({
  useGetUserExercises: vi.fn(),
}));

vi.mock("../hooks/useSaveUserExercise", () => ({
  useSaveUserExercise: vi.fn(),
}));

vi.mock("../hooks/useDeleteAllExercisesForUser", () => ({
  useDeleteAllExercisesForUser: vi.fn(),
}));

vi.mock("../hooks/useSaveUserExercise", () => ({
  useSaveUserExercise: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("SignInPage", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    (useRouter as Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    (useGetAllExercises as Mock).mockImplementation(() => ({
      data: mockExercises,
      isLoading: false,
      error: null,
    }));

    (useGetUserExercises as Mock).mockImplementation(() => ({
      data: [],
      isLoading: false,
      error: null,
    }));

    (useDeleteAllExercisesForUser as Mock).mockImplementation(() => ({
      mutate: mockDeleteAllExercisesForUser,
    }));

    (useSaveUserExercise as Mock).mockImplementation(() => ({
      mutate: mockSaveUserExercise,
    }));
  });

  it("displays a spinner while loading", async () => {
    (useGetAllExercises as Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: null,
    }));

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <SettingsPage />
      </QueryClientProvider>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    expect(screen.queryByText("Diamond Pushup")).not.toBeInTheDocument();

    expect(
      screen.queryByText("Reverse Hyperextension"),
    ).not.toBeInTheDocument();
  });

  it("renders with all exercises", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <SettingsPage />
      </QueryClientProvider>,
    );

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Add Diamond Pushup")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Add Reverse Hyperextension"),
    ).toBeInTheDocument();
  });

  it("adds a user exercise and disables add", async () => {
    await act(async () => {
      render(<SettingsPage />);
    });

    await act(async () => {
      fireEvent.click(screen.getByLabelText("Add Diamond Pushup"));
    });

    expect(useSaveUserExercise).toHaveBeenNthCalledWith(1, 13);

    expect(screen.getByLabelText("Add Diamond Pushup")).toBeDisabled();
  });

  it("deletes all exercises for user", async () => {
    (useGetUserExercises as Mock).mockImplementation(() => ({
      data: [
        {
          id: 1,
          exercise: {
            id: 16,
            key: "reverse-hyperextension",
            name: "Reverse Hyperextension",
            category: "CORE_TRIPLET",
            type: "EXTENSION",
            targetSets: 3,
            targetRepsMin: 8,
            targetRepsMax: 12,
            targetRest: 60,
            additionalRest: 60,
            mediaLink: "https://www.youtube.com/watch?v=ZeRsNzFcQLQ&",
            comments: "<ul><li>Keep your butt tucked</li></ul>",
            duration: false,
          },
        },
        {
          id: 2,
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
      ],
      isLoading: false,
      error: null,
    }));

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <SettingsPage />
      </QueryClientProvider>,
    );

    expect(screen.getByLabelText("Add Reverse Hyperextension")).toBeDisabled();
    expect(screen.getByLabelText("Add Diamond Pushup")).toBeDisabled();

    await act(async () => {
      fireEvent.click(screen.getByLabelText("Delete All Of My Exercises"));
    });

    expect(useDeleteAllExercisesForUser).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByLabelText("Add Reverse Hyperextension")).toBeEnabled();
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Add Diamond Pushup")).toBeEnabled();
    });
  });

  it("disables add on load if the user already has the exercise", async () => {
    (useGetUserExercises as Mock).mockImplementation(() => ({
      data: [
        {
          id: 2,
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
      ],
      isLoading: false,
      error: null,
    }));

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <SettingsPage />
      </QueryClientProvider>,
    );

    expect(screen.getByLabelText("Add Diamond Pushup")).toBeDisabled();
  });
});
