import { getYtVidId } from "./getYtVidId";

describe("getYtVidId", () => {
  it("gets the id", () => {
    expect(
      getYtVidId("https://www.youtube.com/watch?v=Vwn5hSf3WEg&test=aaa")
    ).toBe("Vwn5hSf3WEg");
  });
});
