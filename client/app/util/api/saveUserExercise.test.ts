import { Mock } from "vitest";
import { fetchWithAuth } from "../fetchWithAuth";
import { saveUserExercise } from "./saveUserExercise";

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
            id: 1,
            exercise: {
              id: 5,
              key: "arch-hangs-warmup",
              name: "Arch Hangs (Warmup)",
              category: "WARM_UP",
              type: "WARM_UP",
              targetSets: 1,
              targetRepsMin: 10,
              targetRepsMax: 10,
              targetRest: 0,
              additionalRest: 0,
              mediaLink: "https://www.youtube.com/watch?v=C995b3KLXS4&t=7s",
              comments:
                '<ul><li>Add these after you reach Negative Pullups</li><li>Beginner attempts will look more like <a href="https://www.youtube.com/watch?v=HoE-C85ZlCE">this</a></li></ul>',
              duration: false,
            },
          }),
      })
    );

    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("saves user exercise", async () => {
    const result = await saveUserExercise(5);

    const expected = {
      id: 1,
      exercise: {
        id: 5,
        key: "arch-hangs-warmup",
        name: "Arch Hangs (Warmup)",
        category: "WARM_UP",
        type: "WARM_UP",
        targetSets: 1,
        targetRepsMin: 10,
        targetRepsMax: 10,
        targetRest: 0,
        additionalRest: 0,
        mediaLink: "https://www.youtube.com/watch?v=C995b3KLXS4&t=7s",
        comments:
          '<ul><li>Add these after you reach Negative Pullups</li><li>Beginner attempts will look more like <a href="https://www.youtube.com/watch?v=HoE-C85ZlCE">this</a></li></ul>',
        duration: false,
      },
    };

    expect(fetchWithAuth).toHaveBeenNthCalledWith(1, "/user-exercises/save", {
      body: '{"exerciseId":5}',
      method: "POST",
    });

    expect(result).toStrictEqual(expected);
  });
});
