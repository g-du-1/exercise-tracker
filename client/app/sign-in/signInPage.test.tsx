/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";
import SignInPage from "./page";

const signInMock = jest.fn();

jest.mock("../util/api/signIn", () => ({
  signIn: (username: string, password: string) =>
    signInMock(username, password),
}));

describe("SignInPage", () => {
  it("renders", () => {
    render(<SignInPage />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("calls the sign in handler with the correct details on login", () => {
    render(<SignInPage />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(usernameInput, { target: { value: "testUser" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(submitButton);

    expect(signInMock).toHaveBeenCalledWith("testUser", "testPassword");
  });
});
