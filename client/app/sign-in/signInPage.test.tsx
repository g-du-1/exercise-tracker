/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignInPage from "./page";
import { useRouter } from "next/router";
import { signIn } from "../util/api/signIn";

jest.mock("../util/api/signIn", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/router", () => ({
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
});
