import { getAllExercises } from "./getAllExercises";
import { fetchWithAuth } from "../fetchWithAuth";
import { Mock } from "vitest";

vi.mock("../fetchWithAuth", () => ({
  fetchWithAuth: vi.fn(),
}));

describe("getAllExercises", () => {
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
              id: 16,
              key: "reverse-hyperextension",
              name: "Reverse Hyperextension",
              category: "CORE_TRIPLET",
              type: "EXTENSION",
              targetSets: 3,
              targetRepsMin: 8,
              targetRepsMax: 12,
              targetRest: 60,
              additionalRest: 60,
              mediaLink: "https://www.youtube.com/watch?v=ZeRsNzFcQLQ&",
              comments: "<ul><li>Keep your butt tucked</li></ul>",
              duration: false,
            },
            {
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
          ]),
      })
    );

    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("gets all exercises with default endpoint", async () => {
    const result = await getAllExercises();

    const expected = [
      {
        id: 16,
        key: "reverse-hyperextension",
        name: "Reverse Hyperextension",
        category: "CORE_TRIPLET",
        type: "EXTENSION",
        targetSets: 3,
        targetRepsMin: 8,
        targetRepsMax: 12,
        targetRest: 60,
        additionalRest: 60,
        mediaLink: "https://www.youtube.com/watch?v=ZeRsNzFcQLQ&",
        comments: "<ul><li>Keep your butt tucked</li></ul>",
        duration: false,
      },
      {
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
    ];

    expect(fetchWithAuth).toHaveBeenNthCalledWith(1, "/exercises");

    expect(result).toStrictEqual(expected);
  });

  it("calls fetchWithAuth with endpoint set in env", async () => {
    process.env.NEXT_PUBLIC_GET_ALL_EXERCISES_ENDPOINT =
      "/get-all-exercises-endpoint";

    await getAllExercises();

    expect(fetchWithAuth).toHaveBeenNthCalledWith(
      1,
      "/get-all-exercises-endpoint"
    );
  });

  it("throws an error on a failed request", async () => {
    (fetchWithAuth as Mock).mockImplementation(() =>
      Promise.resolve({
        status: 500,
        json: () =>
          Promise.resolve({
            message: "Internal Server Error",
          }),
      })
    );

    await expect(getAllExercises()).rejects.toThrow(
      "Failed to get all exercises."
    );
  });
});
