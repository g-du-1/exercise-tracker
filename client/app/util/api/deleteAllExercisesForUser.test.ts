import { Mock } from "vitest";
import { fetchWithAuth } from "../fetchWithAuth";
import { deleteAllExercisesForUser } from "./deleteAllExercisesForUser";

vi.mock("../fetchWithAuth", () => ({
  fetchWithAuth: vi.fn(),
}));

describe("saveUserExercise", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    (fetchWithAuth as Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            message: "All exercises deleted for user.",
          }),
      })
    );

    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("deletes all user exercises", async () => {
    const result = await deleteAllExercisesForUser();

    const expected = { message: "All exercises deleted for user." };

    expect(fetchWithAuth).toHaveBeenNthCalledWith(1, "/user-exercises/all", {
      method: "DELETE",
    });

    expect(result).toStrictEqual(expected);
  });
});
