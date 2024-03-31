/**
 * @jest-environment jsdom
 */
import { render, fireEvent, screen, act } from "@testing-library/react";
import { ExerciseTracker } from "./ExerciseTracker";
import { getStartTime } from "../util/getStartTime";
import { mockExercises } from "./fixtures/mockExercises";

jest.useFakeTimers();

const DELETE_REPS = "Delete Reps";

const renderExerciseTracker = () =>
  render(<ExerciseTracker exercises={mockExercises} />);

const getModalOpenBtns = () => screen.getAllByLabelText("add");

const clickOpenModalBtn = (idx: number) => {
  const openModalBtns = getModalOpenBtns();

  fireEvent.click(openModalBtns[idx]);
};

const getRepsInput = () => {
  const input = screen.getByLabelText("Reps");
  expect(input).toHaveFocus();

  return input;
};

const submitReps = (val: string) => {
  const input = getRepsInput();
  fireEvent.change(input, { target: { value: val } });
  fireEvent.submit(input);
};

const getDeleteRepsBtn = () => screen.getByLabelText(DELETE_REPS);

const clickDeleteReps = () => fireEvent.click(getDeleteRepsBtn());

describe("ExerciseTracker", () => {
  it("matches snapshot", () => {
    const result = renderExerciseTracker();

    expect(result.container).toMatchSnapshot();
  });

  it("displays modal open buttons next to each exercise", () => {
    renderExerciseTracker();

    expect(getModalOpenBtns()).toHaveLength(3);
  });

  it("open modal button opens a modal on click for the exercise", () => {
    renderExerciseTracker();

    fireEvent.click(getModalOpenBtns()[0]);

    expect(screen.getByText("Add GMB Wrist Prep Reps")).toBeDefined();
  });

  it("does not display more info by default", () => {
    renderExerciseTracker();

    expect(screen.queryByTitle("GMB Wrist Prep Video")).not.toBeVisible();
    expect(screen.queryByTitle("Arch Hangs Video")).not.toBeVisible();
    expect(
      screen.queryByAltText("Parallel Bar Support Hold Image")
    ).not.toBeVisible();
  });

  it("displays videos and images when more info is clicked", () => {
    renderExerciseTracker();

    fireEvent.click(screen.getByLabelText("Show More Info"));

    expect(screen.getByTitle("GMB Wrist Prep Video")).toBeVisible();
    expect(screen.getByTitle("Arch Hangs Video")).toBeVisible();
    expect(
      screen.getByAltText("Parallel Bar Support Hold Image")
    ).toBeVisible();
  });

  it("renders category separators when category changes", () => {
    renderExerciseTracker();

    expect(screen.getAllByTestId("divider")).toHaveLength(2);
  });

  it("saves and resets sets of reps for an exercise", () => {
    renderExerciseTracker();

    clickOpenModalBtn(1);

    submitReps("7");

    clickOpenModalBtn(1);

    submitReps("6");

    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();

    clickOpenModalBtn(1);

    clickDeleteReps();

    expect(screen.queryByText("7")).not.toBeInTheDocument();
    expect(screen.queryByText("6")).not.toBeInTheDocument();
  });

  it("saves reps on modal close", () => {
    renderExerciseTracker();

    clickOpenModalBtn(1);

    const repsInput = getRepsInput();

    fireEvent.change(repsInput, { target: { value: "8" } });

    fireEvent.keyDown(repsInput, {
      key: "Escape",
      code: "Escape",
    });

    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("only renders the delete reps icon if there are reps saved and closes the modal on save", () => {
    renderExerciseTracker();

    clickOpenModalBtn(1);

    expect(screen.queryByLabelText(DELETE_REPS)).not.toBeInTheDocument();

    submitReps("6");

    clickOpenModalBtn(1);

    expect(screen.getByLabelText(DELETE_REPS)).toBeInTheDocument();

    clickDeleteReps();

    expect(screen.queryByText("Add Arch Hangs Reps")).not.toBeVisible();
  });

  it("starts the stopwatch when saving reps", () => {
    renderExerciseTracker();

    clickOpenModalBtn(1);

    submitReps("6");

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:00:05")).toBeInTheDocument();
  });

  it("does not start the stopwatch when saving a warmup", () => {
    renderExerciseTracker();

    clickOpenModalBtn(0);

    submitReps("6");

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  it("starts the stopwatch", () => {
    renderExerciseTracker();

    const startBtn = screen.getByLabelText("Start Stopwatch");

    fireEvent.click(startBtn);

    expect(startBtn).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:00:05")).toBeInTheDocument();
  });

  it("resets the stopwatch", () => {
    renderExerciseTracker();

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

  it("displays a done elem when the saved sets reach the target sets", () => {
    renderExerciseTracker();

    expect(screen.queryByLabelText("Done")).not.toBeInTheDocument();

    clickOpenModalBtn(0);

    submitReps("6");

    expect(screen.getByLabelText("Done")).toBeInTheDocument();
  });

  it("displays warning after the target rest has passed", () => {
    renderExerciseTracker();

    expect(screen.queryByAltText("Rest Time Passed")).not.toBeInTheDocument();

    clickOpenModalBtn(1);

    submitReps("6");

    act(() => {
      jest.advanceTimersByTime(90000);
    });

    expect(screen.getByLabelText("Rest Time Passed")).toBeInTheDocument();
  });

  it("resets the timer when reps are deleted", () => {
    renderExerciseTracker();

    clickOpenModalBtn(1);

    submitReps("6");

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    clickOpenModalBtn(1);

    clickDeleteReps();

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  it("displays target sets", () => {
    renderExerciseTracker();

    expect(screen.getByText("1x10")).toBeInTheDocument();
    expect(screen.getByText("3x5-8")).toBeInTheDocument();
    expect(screen.getByText("3x30s")).toBeInTheDocument();
  });

  it("adds label for in range reps", () => {
    renderExerciseTracker();

    clickOpenModalBtn(1);

    submitReps("6");

    expect(
      screen.getByLabelText("Arch Hangs 6 Reps In Range")
    ).toBeInTheDocument();
  });

  it("adds label for out of range reps - lower", () => {
    renderExerciseTracker();

    clickOpenModalBtn(1);

    submitReps("3");

    expect(
      screen.getByLabelText("Arch Hangs 3 Reps Lower Than Range")
    ).toBeInTheDocument();
  });

  it("adds label for out of range reps - higher", () => {
    renderExerciseTracker();

    clickOpenModalBtn(1);

    submitReps("35");

    expect(
      screen.getByLabelText("Arch Hangs 35 Reps Higher Than Range")
    ).toBeInTheDocument();
  });

  it("adds label for cases without max target step", () => {
    renderExerciseTracker();

    clickOpenModalBtn(0);

    submitReps("10");

    expect(
      screen.getByLabelText("GMB Wrist Prep 10 Reps In Range")
    ).toBeInTheDocument();
  });

  it("hides completed exercises if hiding is turned on", () => {
    renderExerciseTracker();

    expect(screen.getByText("GMB Wrist Prep")).toBeVisible();
    expect(screen.getByText("Arch Hangs")).toBeVisible();
    expect(screen.getByText("Parallel Bar Support Hold")).toBeVisible();

    clickOpenModalBtn(0);

    submitReps("8");

    const checkbox = screen.getByLabelText("Show Completed Exercises");
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    expect(screen.getByText("GMB Wrist Prep")).not.toBeVisible();
    expect(screen.getByText("Arch Hangs")).toBeVisible();
    expect(screen.getByText("Parallel Bar Support Hold")).toBeVisible();
  });

  it("saves and renders start time", () => {
    renderExerciseTracker();

    clickOpenModalBtn(0);

    submitReps("8");

    const startTime = getStartTime();

    expect(screen.getByText(`Started: ${startTime}`)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(500000);
    });

    clickOpenModalBtn(1);

    submitReps("6");

    expect(screen.getByText(`Started: ${startTime}`)).toBeInTheDocument();
  });
});
