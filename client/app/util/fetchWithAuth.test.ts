import { fetchWithAuth } from "./fetchWithAuth";

const mockFetch = vi.fn();

describe("fetchWithAuth", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = mockFetch;
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
      },
    });
  });

  it("includes credentials for cookie-based auth", () => {
    fetchWithAuth("/exercises");

    expect(mockFetch).toHaveBeenCalledTimes(1);

    expect(mockFetch).toHaveBeenCalledWith("/api/v1/exercises", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  });

  it("redirects to sign in on 401", async () => {
    const mockLocation = { href: "" };

    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
    });

    mockFetch.mockResolvedValue({
      status: 401,
    });

    await fetchWithAuth("/exercises");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockLocation.href).toBe("/sign-in");
  });
});
