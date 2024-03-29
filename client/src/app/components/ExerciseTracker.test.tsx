import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExerciseTracker } from "./ExerciseTracker";

describe("ExerciseTracker", () => {
  it("renders", () => {
    const result = render(
      <ExerciseTracker
        exercises={[
          { id: 1, name: "Exercise 1" },
          { id: 2, name: "Exercise 2" },
        ]}
      />
    );

    expect(result.container).toMatchSnapshot();
  });
});
