import { expect, it, describe, afterEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { ExerciseTracker } from "./ExerciseTracker";
import { Exercise } from "../types";

let mockExercises: Exercise[] = [
  {
    id: 1,
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 5,
    targetRepsMax: 10,
    name: "Exercise 1",
  },
  {
    id: 2,
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 5,
    targetRepsMax: 10,
    name: "Exercise 2",
  },
];

describe("ExerciseTracker", () => {
  afterEach(() => {
    mockExercises = [];
  });

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
});
