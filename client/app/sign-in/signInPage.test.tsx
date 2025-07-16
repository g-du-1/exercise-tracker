import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import SignInPage from "./page";
import { useRouter } from "next/navigation";
import { Mock, vi } from "vitest";
import nock from "nock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("SignInPage", () => {
  let mockPush = vi.fn();

  beforeEach(() => {
    nock("http://localhost:3000")
      .post("/api/v1/auth/public/signin")
      .reply(200, {
        username: "testUser",
        roles: ["ROLE_USER"],
      });

    (useRouter as Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    nock.cleanAll();
  });

  it("renders", () => {
    render(<SignInPage />, { wrapper });

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("redirects to home on successful login", async () => {
    render(<SignInPage />, { wrapper });

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(usernameInput, { target: { value: "testUser" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("displays an error message on failed login", async () => {
    nock.cleanAll();

    nock("http://localhost:3000")
      .post("/api/v1/auth/public/signin")
      .reply(401, { message: "Bad credentials", status: false });

    render(<SignInPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "testUser" } });
      fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText("401: Unauthorised")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it("clears the error message on typing", async () => {
    nock.cleanAll();

    nock("http://localhost:3000")
      .post("/api/v1/auth/public/signin", {
        username: "",
        password: "",
      })
      .reply(404, { message: "Bad credentials", status: false })
      .post("/api/v1/auth/public/signin", {
        username: "aaa",
        password: "",
      })
      .reply(404, { message: "Bad credentials", status: false });

    render(<SignInPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "aaa" } });
    });

    expect(screen.queryByText("Something went wrong.")).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    });

    await waitFor(() => {
      fireEvent.change(passwordInput, { target: { value: "ee" } });
    });

    await waitFor(() => {
      expect(
        screen.queryByText("Something went wrong."),
      ).not.toBeInTheDocument();
    });
  });
});
