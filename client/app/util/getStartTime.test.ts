import { getStartTime } from "./getStartTime";

describe("getStartTime", () => {
  it("returns the formatted start time", () => {
    const testDate = new Date();
    testDate.setHours(16);
    testDate.setMinutes(42);

    expect(getStartTime(testDate)).toBe("16:42");
  });
});
