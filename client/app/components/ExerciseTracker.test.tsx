/**
 * @jest-environment jsdom
 */
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
    thumbLink: "https://www.youtube.com/watch?v=HFv2WwgeVMk",
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

  it("displays a video if it has a video link", () => {
    const { queryByTitle } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

    expect(queryByTitle("Exercise 1 Video")).not.toBeNull();
    expect(queryByTitle("Exercise 2 Video")).toBeNull();
  });

  it("displays an image if it has an image", () => {
    const { queryByAltText } = render(
      <ExerciseTracker exercises={mockExercises} />
    );

    expect(queryByAltText("Exercise 1 Image")).toBeNull();
    expect(queryByAltText("Exercise 2 Image")).not.toBeNull();
  });

  // it("thumbnail", () => {
  //   const { getByText } = render(<ExerciseTracker exercises={mockExercises} />);

  //   const thumbnailIcon = getByText("xxxxxxx");
  // });
});
