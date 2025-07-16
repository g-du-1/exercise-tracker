import { fetchWithAuth } from "../fetchWithAuth";
import { signIn } from "./signIn";
import { Mock } from "vitest";

vi.mock("../fetchWithAuth", () => ({
  fetchWithAuth: vi.fn(),
}));

describe("signIn", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    (fetchWithAuth as Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
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

  it("returns error status and message on unsuccessful login", async () => {
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

    const result = await signIn("testUser", "testPassword");

    expect(result).toStrictEqual({
      status: 401,
      message: "Bad credentials",
    });
  });

  it("handles successful login response", async () => {
    (fetchWithAuth as Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            username: "testUser",
            roles: ["ROLE_USER"],
          }),
      })
    );

    const result = await signIn("testUser", "testPassword");

    expect(result).toStrictEqual({
      status: 200,
      message: undefined,
    });
  });
});
