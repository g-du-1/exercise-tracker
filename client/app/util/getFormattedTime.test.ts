import { getFormattedTime } from "./getFormattedTime";

describe("getFormattedTime", () => {
  it("returns the formatted time", () => {
    const testDate = new Date();
    testDate.setHours(16);
    testDate.setMinutes(42);

    expect(getFormattedTime(testDate)).toBe("16:42");
  });
});
