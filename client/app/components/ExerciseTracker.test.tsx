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
    targetRepsMin: 10,
    name: "Exercise 1",
    thumbLink: "https://www.youtube.com/watch?v=HFv2WwgeVMk",
    targetRest: 0,
  },
  {
    id: 2,
    category: "firstPair",
    type: "pullUp",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    name: "Exercise 2",
    thumbLink: "https://i.imgur.com/6vOLzTC.jpg",
    targetRest: 90,
  },
  {
    id: 3,
    category: "firstPair",
    type: "dip",
    targetSets: 3,
    targetRepsMin: 30,
    targetRest: 90,
    isDuration: true,
    name: "Parallel Bar Support Hold",
    thumbLink:
      "https://antranik.org/wp-content/uploads/2014/01/antranik-holding-support-hold-on-parallel-bars.jpg",
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

    expect(addButtons).toHaveLength(3);
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
    const { getByTestId } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

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

    expect(getByText("7")).toBeInTheDocument();
    expect(getByText("6")).toBeInTheDocument();

    fireEvent.click(addButtons[1]);

    fireEvent.click(screen.getByLabelText("Delete Reps"));

    expect(screen.queryByText("7")).not.toBeInTheDocument();
    expect(screen.queryByText("6")).not.toBeInTheDocument();
  });

  it("saves reps on submit", () => {
    const { getAllByLabelText, getByText } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

    const addButtons = getAllByLabelText("add");

    fireEvent.click(addButtons[1]);

    const input = screen.getByLabelText("Reps");
    expect(input).toHaveFocus();

    fireEvent.change(input, { target: { value: "7" } });

    fireEvent.submit(input);

    expect(getByText("7")).toBeInTheDocument();
  });

  it("only renders the delete reps icon if there are reps saved and closes the modal on save", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    const addButtons = screen.getAllByLabelText("add");

    fireEvent.click(addButtons[1]);

    expect(screen.queryByLabelText("Delete Reps")).not.toBeInTheDocument();

    const input = screen.getByLabelText("Reps");

    fireEvent.change(input, { target: { value: "6" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 2 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    fireEvent.click(addButtons[1]);

    expect(screen.getByLabelText("Delete Reps")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Delete Reps"));

    expect(screen.queryByText("Add Exercise 2 Reps")).not.toBeVisible();
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

  it("does not start the stopwatch when saving a warmup", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    const addButtons = screen.getAllByLabelText("add");

    fireEvent.click(addButtons[0]);

    const input = screen.getByLabelText("Reps");

    fireEvent.change(input, { target: { value: "6" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 1 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
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

  it("displays a tick when the saved sets reach the target sets", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    expect(screen.queryByLabelText("Done")).not.toBeInTheDocument();

    const addButtons = screen.getAllByLabelText("add");

    fireEvent.click(addButtons[0]);

    const input = screen.getByLabelText("Reps");

    fireEvent.change(input, { target: { value: "6" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 1 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    expect(screen.getByLabelText("Done")).toBeInTheDocument();
  });

  it("displays warning after the target rest has passed", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    expect(screen.queryByAltText(/rest time passed/i)).not.toBeInTheDocument();

    const addButtons = screen.getAllByLabelText("add");

    fireEvent.click(addButtons[1]);

    const input = screen.getByLabelText("Reps");

    fireEvent.change(input, { target: { value: "6" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 2 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    act(() => {
      jest.advanceTimersByTime(90000);
    });

    expect(screen.getByLabelText(/rest time passed/i)).toBeInTheDocument();
  });

  it("resets the timer when reps are deleted", () => {
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

    fireEvent.click(addButtons[1]);

    fireEvent.click(screen.getByLabelText("Delete Reps"));

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  it("displays target sets", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    expect(screen.getByText("1x10")).toBeInTheDocument();
    expect(screen.getByText("3x5-8")).toBeInTheDocument();
    expect(screen.getByText("3x30s")).toBeInTheDocument();
  });

  it("adds label for in range reps", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    const addButtons = screen.getAllByLabelText("add");

    fireEvent.click(addButtons[1]);

    const input = screen.getByLabelText("Reps");

    fireEvent.change(input, { target: { value: "6" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 2 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    expect(
      screen.getByLabelText("Exercise 2 6 Reps In Range")
    ).toBeInTheDocument();
  });

  it("adds label for out of range reps - lower", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    const addButtons = screen.getAllByLabelText("add");

    fireEvent.click(addButtons[1]);

    const input = screen.getByLabelText("Reps");

    fireEvent.change(input, { target: { value: "3" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 2 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    expect(
      screen.getByLabelText("Exercise 2 3 Reps Lower Than Range")
    ).toBeInTheDocument();
  });

  it("adds label for out of range reps - higher", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    const addButtons = screen.getAllByLabelText("add");

    fireEvent.click(addButtons[1]);

    const input = screen.getByLabelText("Reps");

    fireEvent.change(input, { target: { value: "35" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 2 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    expect(
      screen.getByLabelText("Exercise 2 35 Reps Higher Than Range")
    ).toBeInTheDocument();
  });

  it("adds label for cases without max target step", () => {
    render(<ExerciseTracker exercises={mockExercises} />);

    const addButtons = screen.getAllByLabelText("add");

    fireEvent.click(addButtons[0]);

    const input = screen.getByLabelText("Reps");

    fireEvent.change(input, { target: { value: "10" } });

    fireEvent.keyDown(screen.getByText("Add Exercise 1 Reps"), {
      key: "Escape",
      code: "Escape",
    });

    expect(
      screen.getByLabelText("Exercise 1 10 Reps In Range")
    ).toBeInTheDocument();
  });
});
