// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

beforeEach(() => {
  window.HTMLMediaElement.prototype.play = jest.fn();
});
