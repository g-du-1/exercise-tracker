import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExerciseTracker } from "./ExerciseTracker";

describe("ExerciseTracker", () => {
  it("renders", () => {
    render(
      <ExerciseTracker
        exercises={[
          { id: 1, name: "Exercise 1" },
          { id: 2, name: "Exercise 2" },
        ]}
      />
    );

    expect(screen.getByText("Exercise 1")).toBeDefined();
    expect(screen.getByText("Exercise 2")).toBeDefined();
  });
});
