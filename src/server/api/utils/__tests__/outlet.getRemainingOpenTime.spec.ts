import { type Outlet } from "@prisma/client";
import { getRemainingOpenTime } from "../outlet";

let mockOutlet: Outlet;

beforeEach(() => {
  mockOutlet = {
    openingHours: [
      {
        weekday: "wednesday",
        openAt: "09:00",
        closesAt: "18:00",
        closesAtNextDay: false,
      },
    ],
  } as Outlet;
});

describe("getRemainingOpenTime", () => {
  it("returns null if the weekday opening hours are not found", () => {
    // mock date to be Tuesday at 9am
    const date = new Date(2023, 3, 11, 9);

    const result = getRemainingOpenTime(mockOutlet, date);
    expect(result).toBe(null);
  });

  it("return the remaining open time if the outlet opening hours are found", () => {
    // mock date to be Wednesday at 9am
    const date = new Date(2023, 3, 12, 9);

    const result = getRemainingOpenTime(mockOutlet, date);
    expect(result?.hours).toBe(9);
  });
});
