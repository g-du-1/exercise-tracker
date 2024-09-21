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
import { Mock } from "vitest";

vi.mock("../util/api/signIn", () => ({
  signIn: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("SignInPage", () => {
  let mockPush = vi.fn();

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    (signIn as Mock).mockImplementation(() => Promise.resolve({ status: 200 }));

    (useRouter as Mock).mockImplementation(() => ({
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
    (signIn as Mock).mockImplementation(() =>
      Promise.resolve({ status: 401, message: "Bad credentials" })
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
    (signIn as Mock).mockImplementation(() =>
      Promise.resolve({ status: 401, message: "Bad credentials" })
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
