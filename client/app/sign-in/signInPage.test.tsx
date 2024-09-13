/**
 * @jest-environment jsdom
 */

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import SignInPage from "./page";
import { useRouter } from "next/navigation";
import { signIn } from "../util/api/signIn";

jest.mock("../util/api/signIn", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignInPage", () => {
  let mockPush = jest.fn();

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    (signIn as jest.Mock).mockImplementation(() =>
      Promise.resolve({ status: 200 }),
    );

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  it("renders", () => {
    render(<SignInPage />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("redirects to home on successful login", async () => {
    render(<SignInPage />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(usernameInput, { target: { value: "testUser" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(submitButton);

    expect(signIn).toHaveBeenNthCalledWith(1, "testUser", "testPassword");

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("displays an error message on failed login", async () => {
    (signIn as jest.Mock).mockImplementation(() =>
      Promise.resolve({ status: 401, message: "Bad credentials" }),
    );

    render(<SignInPage />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "testUser" } });
      fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
      fireEvent.click(submitButton);
    });

    expect(signIn).toHaveBeenNthCalledWith(1, "testUser", "wrongPassword");

    expect(screen.getByText("Bad credentials")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it("clears the error message on typing", async () => {
    (signIn as jest.Mock).mockImplementation(() =>
      Promise.resolve({ status: 401, message: "Bad credentials" }),
    );

    render(<SignInPage />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText("Bad credentials")).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "aaa" } });
    });

    expect(screen.queryByText("Bad credentials")).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText("Bad credentials")).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "ee" } });
    });

    expect(screen.queryByText("Bad credentials")).not.toBeInTheDocument();
  });
});
