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

  it("starts and stops the stopwatch", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start / Stop"));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    fireEvent.click(screen.getByText("Start / Stop"));

    expect(screen.getByText("00:00:05")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Start / Stop"));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText("00:00:08")).toBeInTheDocument();
  });

  it("resets the stopwatch", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start / Stop"));

    act(() => {
      jest.advanceTimersByTime(8000);
    });

    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });
});
