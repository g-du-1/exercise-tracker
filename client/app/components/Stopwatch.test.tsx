/**
 * @jest-environment jsdom
 */
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Stopwatch } from "./Stopwatch";

jest.useFakeTimers();

describe("Stopwatch", () => {
  it("renders stopwatch with initial time of 00:00:00", () => {
    const result = render(<Stopwatch />);

    expect(result.container).toMatchSnapshot();
  });

  it("starts the stopwatch", () => {
    render(<Stopwatch />);

    const startBtn = screen.getByLabelText("Start Stopwatch");
    fireEvent.click(startBtn);
    expect(startBtn).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:00:05")).toBeInTheDocument();
  });

  it("resets the stopwatch", () => {
    render(<Stopwatch />);

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
