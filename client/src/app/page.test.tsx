import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Home Page", () => {
  it("renders", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Exercise Tracker" })
    ).toBeDefined();
  });
});
