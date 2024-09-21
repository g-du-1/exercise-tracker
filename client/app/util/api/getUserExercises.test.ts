import { Mock } from "vitest";
import { fetchWithAuth } from "../fetchWithAuth";
import { getUserExercises } from "./getUserExercises";

vi.mock("../fetchWithAuth", () => ({
  fetchWithAuth: vi.fn(),
}));

describe("getUserExercises", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    (fetchWithAuth as Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve([
            {
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
            },
            {
              id: 2,
              exercise: {
                id: 13,
                key: "diamond-pushup",
                name: "Diamond Pushup",
                category: "THIRD_PAIR",
                type: "PUSH_UP",
                targetSets: 3,
                targetRepsMin: 5,
                targetRepsMax: 8,
                targetRest: 90,
                additionalRest: 90,
                mediaLink: "https://www.youtube.com/watch?v=J0DnG1_S92I",
                comments:
                  "<ul><li>Put your hands close together so the thumbs and index fingers touch, then perform a pushup</li><li>If this is too difficult or feels uncomfortable, put your hands just a bit closer than in a normal pushup. Work on moving the hands closer together over time until you reach diamond pushups</li></ul>",
                duration: false,
              },
            },
          ]),
      })
    );

    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("gets user exercises with the default endpoint", async () => {
    const result = await getUserExercises();

    const expected = [
      {
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
      },
      {
        id: 2,
        exercise: {
          id: 13,
          key: "diamond-pushup",
          name: "Diamond Pushup",
          category: "THIRD_PAIR",
          type: "PUSH_UP",
          targetSets: 3,
          targetRepsMin: 5,
          targetRepsMax: 8,
          targetRest: 90,
          additionalRest: 90,
          mediaLink: "https://www.youtube.com/watch?v=J0DnG1_S92I",
          comments:
            "<ul><li>Put your hands close together so the thumbs and index fingers touch, then perform a pushup</li><li>If this is too difficult or feels uncomfortable, put your hands just a bit closer than in a normal pushup. Work on moving the hands closer together over time until you reach diamond pushups</li></ul>",
          duration: false,
        },
      },
    ];

    expect(fetchWithAuth).toHaveBeenNthCalledWith(1, "/user-exercises");

    expect(result).toStrictEqual(expected);
  });
});
