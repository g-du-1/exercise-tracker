import { act, fireEvent, render, screen } from "@testing-library/react";
import { ExerciseTracker } from "./ExerciseTracker";
import { getFormattedTime } from "../util/getFormattedTime";
import { mockExercises } from "./fixtures/mockExercises";
import { useQuery } from "@tanstack/react-query";
import { Mock, vi } from "vitest";

const DELETE_REPS = "Delete Reps";

const renderExerciseTracker = () => render(<ExerciseTracker />);

const getModalOpenTriggers = () => screen.getAllByLabelText(/^Open .* Modal$/);

const clickOpenModalTrigger = (idx: number) => {
  const openModalTriggers = getModalOpenTriggers();

  fireEvent.click(openModalTriggers[idx]);
};

const getRepsInput = () => {
  const input = screen.getByLabelText("Add Reps");
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

// TODO: Make tests more maintainable

describe("ExerciseTracker", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    process.env.NEXT_PUBLIC_ENABLE_API_CONNECTION = "true";

    (useQuery as Mock).mockImplementation(() => ({
      data: mockExercises,
      isLoading: false,
      error: null,
    }));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("matches snapshot", () => {
    renderExerciseTracker();

    fireEvent.click(screen.getByLabelText("Open Menu"));

    expect(document.body).toMatchSnapshot();
  });

  it("outputs open modal triggers for each exercise", () => {
    renderExerciseTracker();

    expect(getModalOpenTriggers()).toHaveLength(3);
  });

  it("open modal trigger opens a modal on click for the exercise", () => {
    renderExerciseTracker();

    fireEvent.click(getModalOpenTriggers()[0]);

    expect(screen.getByText("Add GMB Wrist Prep Reps")).toBeDefined();
  });

  it("does not display media by default", () => {
    renderExerciseTracker();

    expect(screen.queryByTitle("GMB Wrist Prep Video")).not.toBeVisible();
    expect(screen.queryByTitle("Arch Hangs Video")).not.toBeVisible();
    expect(
      screen.queryByAltText("Parallel Bar Support Hold Image"),
    ).not.toBeVisible();
  });

  it("displays media when toggle media is clicked", () => {
    renderExerciseTracker();

    fireEvent.click(screen.getByLabelText("Open Menu"));
    fireEvent.click(screen.getByLabelText("Toggle Media"));

    expect(screen.getByTitle("GMB Wrist Prep Video")).toBeVisible();
    expect(screen.getByTitle("Arch Hangs Video")).toBeVisible();
    expect(
      screen.getByAltText("Parallel Bar Support Hold Image"),
    ).toBeVisible();
  });

  it("renders category separators when category changes", () => {
    renderExerciseTracker();

    expect(screen.getAllByRole("separator")).toHaveLength(2);
  });

  it("saves and resets sets of reps for an exercise", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    submitReps("7");

    clickOpenModalTrigger(1);

    submitReps("6");

    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();

    clickOpenModalTrigger(1);

    clickDeleteReps();

    expect(screen.queryByText("7")).not.toBeInTheDocument();
    expect(screen.queryByText("6")).not.toBeInTheDocument();
  });

  it("saves reps on modal close", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    const repsInput = getRepsInput();

    fireEvent.change(repsInput, { target: { value: "8" } });

    fireEvent.keyDown(repsInput, {
      key: "Escape",
      code: "Escape",
    });

    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("does not save reps on cancel click", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    const repsInput = getRepsInput();

    fireEvent.change(repsInput, { target: { value: "8" } });

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByText("8")).not.toBeInTheDocument();
  });

  it("only renders the delete reps icon if there are reps saved and closes the modal on save", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    expect(screen.queryByLabelText(DELETE_REPS)).not.toBeInTheDocument();

    submitReps("6");

    clickOpenModalTrigger(1);

    expect(screen.getByLabelText(DELETE_REPS)).toBeInTheDocument();

    clickDeleteReps();

    expect(screen.queryByText("Add Arch Hangs Reps")).not.toBeVisible();
  });

  it("starts the stopwatch when saving reps", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    submitReps("6");

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:00:05")).toBeInTheDocument();
  });

  it("does not start the stopwatch when saving a warmup", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(0);

    submitReps("6");

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  it("starts and stops the stopwatch", () => {
    renderExerciseTracker();

    expect(
      screen.getByRole("button", {
        name: /stop stopwatch/i,
      }),
    ).toBeDisabled();

    fireEvent.click(
      screen.getByRole("button", {
        name: /restart stopwatch/i,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(8000);
    });

    expect(screen.getByText(/00:00:08/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /stop stopwatch/i,
      }),
    ).toBeEnabled();

    fireEvent.click(
      screen.getByRole("button", {
        name: /stop stopwatch/i,
      }),
    );

    expect(screen.getByText(/00:00:00/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /stop stopwatch/i,
      }),
    ).toBeDisabled();
  });

  it("resets stopwatch", () => {
    renderExerciseTracker();

    fireEvent.click(
      screen.getByRole("button", {
        name: /restart stopwatch/i,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(8000);
    });

    expect(screen.getByText(/00:00:08/i)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /restart stopwatch/i,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText(/00:00:03/i)).toBeInTheDocument();
  });

  it("displays a done elem when the saved sets reach the target sets", () => {
    renderExerciseTracker();

    expect(
      screen.queryByLabelText("Exercise Completed"),
    ).not.toBeInTheDocument();

    clickOpenModalTrigger(0);

    submitReps("6");

    expect(screen.getByLabelText("Exercise Completed")).toBeInTheDocument();
  });

  it("displays warning after the target rest has passed", () => {
    renderExerciseTracker();

    expect(screen.queryByAltText("Rest Time Passed")).not.toBeInTheDocument();

    expect(
      screen.queryByAltText("Additional Rest Time Passed"),
    ).not.toBeInTheDocument();

    clickOpenModalTrigger(1);

    submitReps("6");

    act(() => {
      vi.advanceTimersByTime(90000);
    });

    expect(screen.getByLabelText("Rest Time Passed")).toBeInTheDocument();

    expect(
      screen.queryByLabelText("Additional Rest Time Passed"),
    ).not.toBeInTheDocument();
  });

  it("does not display rest time warning after adding reps to a warmup", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(0);

    submitReps("6");

    fireEvent.click(screen.getByLabelText(/restart stopwatch/i));

    act(() => {
      vi.advanceTimersByTime(100000);
    });

    expect(screen.queryByLabelText("Rest Time Passed")).not.toBeInTheDocument();

    expect(
      screen.queryByLabelText("Additional Rest Time Passed"),
    ).not.toBeInTheDocument();
  });

  it("displays a more severe warning when additional rest time is passed", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    submitReps("6");

    act(() => {
      vi.advanceTimersByTime(200000);
    });

    expect(screen.queryByLabelText("Rest Time Passed")).not.toBeInTheDocument();

    expect(
      screen.getByLabelText("Additional Rest Time Passed"),
    ).toBeInTheDocument();
  });

  it("resets the timer when reps are deleted", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    submitReps("6");

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    clickOpenModalTrigger(1);

    clickDeleteReps();

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  it("displays target sets", () => {
    renderExerciseTracker();

    expect(screen.getByText("1x10")).toBeInTheDocument();
    expect(screen.getByText("3x5-8")).toBeInTheDocument();
    expect(screen.getByText("3x60s")).toBeInTheDocument();
  });

  it("adds label for in range reps", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    submitReps("6");

    expect(
      screen.getByLabelText("Arch Hangs 6 Reps In Range"),
    ).toBeInTheDocument();
  });

  it("adds label for out of range reps - lower", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    submitReps("3");

    expect(
      screen.getByLabelText("Arch Hangs 3 Reps Lower Than Range"),
    ).toBeInTheDocument();
  });

  it("adds label for out of range reps - higher", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    submitReps("35");

    expect(
      screen.getByLabelText("Arch Hangs 35 Reps Higher Than Range"),
    ).toBeInTheDocument();
  });

  it("adds label for cases without max target step", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(0);

    submitReps("10");

    expect(
      screen.getByLabelText("GMB Wrist Prep 10 Reps In Range"),
    ).toBeInTheDocument();
  });

  it("hides completed exercises if hiding is turned on", () => {
    renderExerciseTracker();

    expect(screen.getByText("GMB Wrist Prep")).toBeVisible();
    expect(screen.getByText("Arch Hangs")).toBeVisible();
    expect(screen.getByText("Parallel Bar Support Hold")).toBeVisible();

    clickOpenModalTrigger(0);

    submitReps("8");

    fireEvent.click(screen.getByLabelText("Open Menu"));
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

    clickOpenModalTrigger(0);

    submitReps("8");

    const startTime = getFormattedTime();

    expect(screen.getByText(`Started: ${startTime}`)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500000);
    });

    clickOpenModalTrigger(1);

    submitReps("6");

    expect(screen.getByText(`Started: ${startTime}`)).toBeInTheDocument();
  });

  it("saves and renders finish time after completing the last exercise", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(2);
    submitReps("8");
    clickOpenModalTrigger(2);
    submitReps("7");
    clickOpenModalTrigger(2);
    submitReps("8");

    expect(
      screen.getByText(`Finished: ${getFormattedTime()}`),
    ).toBeInTheDocument();
  });

  it("shows comments when they are turned on", () => {
    renderExerciseTracker();

    expect(
      screen.queryByText("Do as many reps as you want"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Elbows should stay straight"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        "Work up to 3 sets of 1 minute holds for this progression",
      ),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Open Menu"));
    fireEvent.click(screen.getByLabelText("Toggle Comments"));

    expect(screen.getByText("Do as many reps as you want")).toBeInTheDocument();

    expect(screen.getByText("Elbows should stay straight")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Work up to 3 sets of 1 minute holds for this progression",
      ),
    ).toBeInTheDocument();
  });

  it("does not start the timer after the last exercise and last rep is done", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(2);
    submitReps("8");
    clickOpenModalTrigger(2);
    submitReps("7");
    clickOpenModalTrigger(2);
    submitReps("6");

    act(() => {
      vi.advanceTimersByTime(50000);
    });

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  it("plays alerts when rest times pass", () => {
    renderExerciseTracker();

    clickOpenModalTrigger(1);

    submitReps("6");

    act(() => {
      vi.advanceTimersByTime(190000);
    });

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  });

  it("displays spinner while loading", () => {
    (useQuery as Mock).mockImplementation(() => ({
      data: [],
      isLoading: true,
      isError: false,
    }));

    renderExerciseTracker();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays a message when there are no exercises", () => {
    (useQuery as Mock).mockImplementation(() => ({
      data: [],
      isLoading: false,
      isError: false,
    }));

    renderExerciseTracker();

    expect(screen.getByText("No exercises.")).toBeInTheDocument();
  });
});
