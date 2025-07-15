import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("zustand");

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

beforeEach(() => {
  window.HTMLMediaElement.prototype.play = vi.fn();
});
