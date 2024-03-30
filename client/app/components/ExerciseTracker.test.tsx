/**
 * @jest-environment jsdom
 */
import { render, fireEvent, screen, act } from "@testing-library/react";
import { ExerciseTracker } from "./ExerciseTracker";
import { Exercise } from "../types";

jest.useFakeTimers();

let mockExercises: Exercise[] = [
  {
    id: 1,
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 5,
    targetRepsMax: 10,
    name: "Exercise 1",
    thumbLink: "https://www.youtube.com/watch?v=HFv2WwgeVMk",
    targetRest: 0,
  },
  {
    id: 2,
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 5,
    targetRepsMax: 10,
    name: "Exercise 2",
    thumbLink: "https://i.imgur.com/6vOLzTC.jpg",
    targetRest: 0,
  },
];

describe("ExerciseTracker", () => {
  it("renders", () => {
    const result = render(<ExerciseTracker exercises={mockExercises} />);

    expect(result.container).toMatchSnapshot();
  });

  it("displays add buttons next to each exercise", () => {
    const { getAllByLabelText } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

    const addButtons = getAllByLabelText("add");

    expect(addButtons).toHaveLength(2);
  });

  it("add button opens a modal on click for the exercise", () => {
    const { getAllByLabelText, getByText } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

    const addButtons = getAllByLabelText("add");

    fireEvent.click(addButtons[0]);

    expect(getByText("Add Exercise 1 Reps")).toBeDefined();
  });

  it("does not display more info by default", () => {
    const { queryByTitle, queryByAltText } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

    expect(queryByTitle("Exercise 1 Video")).not.toBeVisible();
    expect(queryByTitle("Exercise 2 Video")).toBeNull();
    expect(queryByAltText("Exercise 1 Image")).toBeNull();
    expect(queryByAltText("Exercise 2 Image")).not.toBeVisible();
  });

  it("displays a video if it has a video link", () => {
    const { queryByTitle, getByLabelText } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

    fireEvent.click(getByLabelText("Show More Info"));

    expect(queryByTitle("Exercise 1 Video")).toBeVisible();
    expect(queryByTitle("Exercise 2 Video")).toBeNull();
  });

  it("displays an image if it has an image link", () => {
    const { queryByAltText, getByLabelText } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

    fireEvent.click(getByLabelText("Show More Info"));

    expect(queryByAltText("Exercise 1 Image")).toBeNull();
    expect(queryByAltText("Exercise 2 Image")).not.toBeNull();
  });

  it("toggles more info", () => {
    const { getByLabelText, queryByTitle } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

    const moreInfoIcon = getByLabelText("Show More Info");

    fireEvent.click(moreInfoIcon);
    expect(queryByTitle("Exercise 1 Video")).not.toBeNull();

    fireEvent.click(moreInfoIcon);
    expect(queryByTitle("Exercise 1 Video")).not.toBeVisible();
  });

  it("renders category separator when category changes", () => {
    const exercises: Exercise[] = [
      ...mockExercises,
      {
        id: 3,
        category: "firstPair",
        type: "pullUp",
        targetSets: 3,
        targetRepsMin: 5,
        targetRepsMax: 8,
        name: "Exercise 3",
        targetRest: 0,
      },
    ];

    const { getByTestId } = render(<ExerciseTracker exercises={exercises} />);

    expect(getByTestId("divider")).toBeInTheDocument();
  });

  it("saves and resets sets of reps for an exercise", () => {
    const { getAllByLabelText, getByText } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

    const addButtons = getAllByLabelText("add");

    fireEvent.click(addButtons[1]);

    const input = screen.getByLabelText("Reps");
    expect(input).toHaveFocus();

    fireEvent.change(input, { target: { value: "7" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 2 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    fireEvent.click(addButtons[1]);

    const inputTwo = screen.getByLabelText("Reps");
    expect(inputTwo).toHaveFocus();

    fireEvent.change(inputTwo, { target: { value: "6" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 2 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    expect(getByText("76")).toBeInTheDocument();

    const resetRepsButtons = getAllByLabelText("Delete Reps");

    fireEvent.click(resetRepsButtons[0]);

    expect(screen.queryByText("76")).not.toBeInTheDocument();
  });

  it("only renders delete reps icons if there are reps saved", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    const addButtons = screen.getAllByLabelText("add");

    fireEvent.click(addButtons[1]);

    const input = screen.getByLabelText("Reps");

    fireEvent.change(input, { target: { value: "6" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 2 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    expect(screen.getAllByLabelText("Delete Reps")).toHaveLength(1);

    fireEvent.click(screen.getAllByLabelText("Delete Reps")[0]);

    expect(screen.queryAllByLabelText("Delete Reps")).toHaveLength(0);
  });

  it("starts the stopwatch when saving reps", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    const addButtons = screen.getAllByLabelText("add");

    fireEvent.click(addButtons[1]);

    const input = screen.getByLabelText("Reps");

    fireEvent.change(input, { target: { value: "6" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 2 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:00:05")).toBeInTheDocument();
  });

  it("starts the stopwatch", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    const startBtn = screen.getByLabelText("Start Stopwatch");
    fireEvent.click(startBtn);
    expect(startBtn).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:00:05")).toBeInTheDocument();
  });

  it("resets the stopwatch", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    const resetBtn = screen.getByLabelText("Reset Stopwatch");
    expect(resetBtn).toBeDisabled();

    const startBtn = screen.getByLabelText("Start Stopwatch");
    fireEvent.click(startBtn);
    expect(startBtn).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(8000);
    });

    fireEvent.click(resetBtn);

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });
});
