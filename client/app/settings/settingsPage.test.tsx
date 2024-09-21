/**
 * @jest-environment jsdom
 */

import { act, fireEvent, render, screen } from "@testing-library/react";
import SettingsPage from "./page";
import { getAllExercises } from "../util/api/getAllExercises";
import { saveUserExercise } from "../util/api/saveUserExercise";
import { deleteAllExercisesForUser } from "../util/api/deleteAllExercisesForUser";
import { getUserExercises } from "../util/api/getUserExercises";

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

jest.mock("../util/api/getAllExercises", () => ({
  getAllExercises: jest.fn(),
}));

jest.mock("../util/api/getUserExercises", () => ({
  getUserExercises: jest.fn(),
}));

jest.mock("../util/api/saveUserExercise", () => ({
  saveUserExercise: jest.fn(),
}));

jest.mock("../util/api/deleteAllExercisesForUser", () => ({
  deleteAllExercisesForUser: jest.fn(),
}));

describe("SignInPage", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    (getAllExercises as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockExercises)
    );

    (getUserExercises as jest.Mock).mockImplementation(() =>
      Promise.resolve([])
    );
  });

  it("displays a spinner while loading", async () => {
    (getAllExercises as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    await act(async () => {
      render(<SettingsPage />);
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    expect(screen.queryByText("Diamond Pushup")).not.toBeInTheDocument();

    expect(
      screen.queryByText("Reverse Hyperextension")
    ).not.toBeInTheDocument();
  });

  it("renders with all exercises", async () => {
    await act(async () => {
      render(<SettingsPage />);
    });

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Add Diamond Pushup")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Add Reverse Hyperextension")
    ).toBeInTheDocument();
  });

  it("adds a user exercise and disables add", async () => {
    await act(async () => {
      render(<SettingsPage />);
    });

    await act(async () => {
      fireEvent.click(screen.getByLabelText("Add Diamond Pushup"));
    });

    expect(saveUserExercise).toHaveBeenNthCalledWith(1, 13);

    expect(screen.getByLabelText("Add Diamond Pushup")).toBeDisabled();
  });

  it("deletes all exercises for user", async () => {
    await act(async () => {
      render(<SettingsPage />);
    });

    fireEvent.click(screen.getByLabelText("Delete All Of My Exercises"));

    expect(deleteAllExercisesForUser).toHaveBeenCalledTimes(1);
  });

  it("disables add on load if the user already has the exercise", async () => {
    (getUserExercises as jest.Mock).mockImplementation(() =>
      Promise.resolve([
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
      ])
    );

    await act(async () => {
      render(<SettingsPage />);
    });

    expect(screen.getByLabelText("Add Diamond Pushup")).toBeDisabled();
  });
});
