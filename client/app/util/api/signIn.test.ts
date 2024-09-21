import { fetchWithAuth } from "../fetchWithAuth";
import { signIn } from "./signIn";
import { localStorageMock } from "../../tests/localStorageMock";
import { Mock } from "vitest";

vi.mock("../fetchWithAuth", () => ({
  fetchWithAuth: vi.fn(),
}));

describe("signIn", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });

    localStorage.setItem("JWT_TOKEN", "");

    (fetchWithAuth as Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            jwtToken: "token",
            username: "user1",
            roles: ["ROLE_USER"],
          }),
      })
    );

    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("calls fetchWithAuth with endpoint set in env and maps status", async () => {
    process.env.NEXT_PUBLIC_API_SIGN_IN_ENDPOINT = "sign-in-endpoint";

    const result = await signIn("testUser", "testPassword");

    expect(fetchWithAuth).toHaveBeenNthCalledWith(1, "sign-in-endpoint", {
      method: "POST",
      body: '{"username":"testUser","password":"testPassword"}',
    });

    expect(result).toStrictEqual({ status: 200, message: undefined });
  });

  it("calls fetchWithAuth with default endpoint if none set in env", async () => {
    await signIn("testUser", "testPassword");

    expect(fetchWithAuth).toHaveBeenNthCalledWith(1, "/auth/public/signin", {
      method: "POST",
      body: '{"username":"testUser","password":"testPassword"}',
    });
  });

  it("sets the jwt in localstorage on successful login", async () => {
    await signIn("testUser", "testPassword");

    const mockJwtInStorage = localStorageMock.getItem("JWT_TOKEN");

    expect(mockJwtInStorage).toEqual("token");
  });

  it("does not set the jwt on unsuccessful login", async () => {
    (fetchWithAuth as Mock).mockImplementation(() =>
      Promise.resolve({
        status: 401,
        json: () =>
          Promise.resolve({
            message: "Bad credentials",
            status: false,
          }),
      })
    );

    await signIn("testUser", "testPassword");

    const mockJwtInStorage = localStorageMock.getItem("JWT_TOKEN");

    expect(mockJwtInStorage).toEqual("");
  });
});
