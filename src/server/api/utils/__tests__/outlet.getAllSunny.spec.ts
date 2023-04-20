import { type Outlet } from "@prisma/client";
import { getAllSunny } from "../outlet";

describe("getAllSunny", () => {
  it("returns no outlets if the current date is not within the sunlightHours period", () => {
    // mock the current date as a wednesday at 9am
    const date = new Date(2023, 3, 12, 9);

    const mockOutlets = [
      {
        id: "1",
        name: "Outlet 1",
        sunlightHours: [
          {
            startDate: "01/01",
            endDate: "01/31",
            outletSunlightHours: [
              {
                id: "1",
                startTime: "10:00",
                endTime: "10:15",
                sunshine: 0,
              },
            ],
          },
        ],
      },
    ] as Outlet[];

    const result = getAllSunny(mockOutlets, date);
    expect(result).toHaveLength(0);
  });

  it("returns no outlets if the current time is not within the sunlightHours period", () => {
    // mock the current date as a wednesday at 9am
    const date = new Date(2023, 3, 12, 9);

    const mockOutlets = [
      {
        id: "1",
        name: "Outlet 1",
        sunlightHours: [
          {
            startDate: "09/04",
            endDate: "15/04",
            outletSunlightHours: [
              {
                id: "1",
                startTime: "10:00",
                endTime: "10:15",
                sunshine: 0,
              },
            ],
          },
        ],
      },
    ] as Outlet[];

    const result = getAllSunny(mockOutlets, date);
    expect(result).toHaveLength(0);
  });

  it("returns no outlets if the value of sunshine is 0", () => {
    // mock the current date as a wednesday at 9am
    const date = new Date(2023, 3, 12, 10);

    const mockOutlets = [
      {
        id: "1",
        name: "Outlet 1",
        sunlightHours: [
          {
            startDate: "09/04",
            endDate: "15/04",
            outletSunlightHours: [
              {
                id: "1",
                startTime: "10:00",
                endTime: "10:15",
                sunshine: 0,
              },
            ],
          },
        ],
      },
    ] as Outlet[];

    const result = getAllSunny(mockOutlets, date);
    expect(result).toHaveLength(0);
  });

  it("returns no outlets if the value of sunshine is greater than 0 but the date is included in the period", () => {
    // mock the current date as a wednesday at 9am
    const date = new Date(2023, 3, 12, 10);

    const mockOutlets = [
      {
        id: "1",
        name: "Outlet 1",
        sunlightHours: [
          {
            startDate: "01/01",
            endDate: "15/01",
            outletSunlightHours: [
              {
                id: "1",
                startTime: "10:00",
                endTime: "10:15",
                sunshine: 1,
              },
            ],
          },
        ],
      },
    ] as Outlet[];

    const result = getAllSunny(mockOutlets, date);
    expect(result).toHaveLength(0);
  });

  it("returns outlets if the value of sunshine is greater than zero for the period that includes the current date", () => {
    // mock the current date as a wednesday at 9am
    const date = new Date(2023, 3, 12, 10);

    const mockOutlets = [
      {
        id: "1",
        name: "Outlet 1",
        sunlightHours: [
          {
            startDate: "09/04",
            endDate: "15/04",
            outletSunlightHours: [
              {
                id: "1",
                startTime: "10:00",
                endTime: "10:15",
                sunshine: 1,
              },
            ],
          },
        ],
      },
    ] as Outlet[];

    const result = getAllSunny(mockOutlets, date);
    expect(result).toHaveLength(1);
  });
});
