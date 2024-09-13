/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import SignInPage from "./page";

describe("SignInPage", () => {
  it("renders", () => {
    render(<SignInPage />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
