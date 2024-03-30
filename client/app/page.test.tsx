/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";

describe("Home Page", () => {
  it("renders", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { level: 1, name: "BWF Tracker" })
    ).toBeDefined();
  });
});