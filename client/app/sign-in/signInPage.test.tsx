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
import { nockBaseUrl, signIn } from "../nock";

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
    nock(nockBaseUrl)
      .post(signIn.path)
      .reply(signIn.success.status, signIn.success.response);

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

    nock(nockBaseUrl)
      .post(signIn.path)
      .reply(signIn.badCredentials.status, signIn.badCredentials.response);

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
      expect(screen.getByText("Bad credentials")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it("clears the error message on typing", async () => {
    nock.cleanAll();

    nock(nockBaseUrl)
      .post(signIn.path, {
        username: "",
        password: "",
      })
      .reply(signIn.badCredentials.status, signIn.badCredentials.response)
      .post(signIn.path, {
        username: "aaa",
        password: "",
      })
      .reply(signIn.badCredentials.status, signIn.badCredentials.response);

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
      expect(screen.getByText("Bad credentials")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "aaa" } });
    });

    expect(screen.queryByText("Bad credentials")).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Bad credentials")).toBeInTheDocument();
    });

    await waitFor(() => {
      fireEvent.change(passwordInput, { target: { value: "ee" } });
    });

    await waitFor(() => {
      expect(screen.queryByText("Bad credentials")).not.toBeInTheDocument();
    });
  });
});
