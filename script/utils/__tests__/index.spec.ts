import { getSecondsSinceMidgnight } from "..";

describe("upload utils", () => {
  it("returns the correct number of seconds elapsed since midnight", () => {
    expect(getSecondsSinceMidgnight("01:00")).toStrictEqual(3600);
    expect(getSecondsSinceMidgnight("09:00")).toStrictEqual(32400);
    expect(getSecondsSinceMidgnight("00:00")).toStrictEqual(0);
    expect(getSecondsSinceMidgnight("09:30")).toStrictEqual(34200);
  });
});
