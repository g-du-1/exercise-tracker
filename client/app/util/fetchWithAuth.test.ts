import { localStorageMock } from "../tests/localStorageMock";
import { fetchWithAuth } from "./fetchWithAuth";
import { getCsrfToken } from "./getCsrfToken";

jest.mock("./getCsrfToken", () => ({
  getCsrfToken: jest.fn(),
}));

const mockFetch = jest.fn();

describe("fetchWithAuthToken", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });

    global.fetch = mockFetch;

    (getCsrfToken as jest.Mock).mockImplementation(() => "csrfToken");

    localStorage.setItem("JWT_TOKEN", "");
    localStorage.setItem("CSRF_TOKEN", "csrfToken");
  });

  it("supports setting extra options", () => {
    fetchWithAuth("/exercises", {
      headers: { CUSTOM_HEADER: "Custom Header" },
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);

    expect(mockFetch).toHaveBeenCalledWith("/api/v1/exercises", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        CUSTOM_HEADER: "Custom Header",
        "X-XSRF-TOKEN": "csrfToken",
      },
    });
  });

  it("adds the auth token to headers if locally present", () => {
    localStorage.setItem("JWT_TOKEN", "token");

    fetchWithAuth("/exercises");

    expect(mockFetch).toHaveBeenCalledTimes(1);

    expect(mockFetch).toHaveBeenCalledWith("/api/v1/exercises", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer token",
        "X-XSRF-TOKEN": "csrfToken",
      },
    });
  });

  it("gets and sets the csrf token if not present locally", async () => {
    localStorage.setItem("CSRF_TOKEN", "");

    await fetchWithAuth("/exercises");

    expect(getCsrfToken).toHaveBeenCalledTimes(1);

    expect(localStorage.getItem("CSRF_TOKEN")).toBe("csrfToken");

    expect(mockFetch).toHaveBeenCalledTimes(1);

    expect(mockFetch).toHaveBeenCalledWith("/api/v1/exercises", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": "csrfToken",
      },
    });
  });

  it("throws an error when cant fetch csrf token", async () => {
    (getCsrfToken as jest.Mock).mockImplementation(() => Promise.reject());

    localStorage.setItem("CSRF_TOKEN", "");

    await expect(() => fetchWithAuth("/exercises")).rejects.toThrow(
      "Couldn't get CSRF Token."
    );

    expect(getCsrfToken).toHaveBeenCalledTimes(1);

    expect(mockFetch).toHaveBeenCalledTimes(0);
  });
});
