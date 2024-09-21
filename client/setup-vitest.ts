import "@testing-library/jest-dom";

vi.mock("zustand");

beforeEach(() => {
  window.HTMLMediaElement.prototype.play = vi.fn();
});
