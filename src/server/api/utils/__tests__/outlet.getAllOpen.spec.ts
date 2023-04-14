import { getAllOpen } from "../outlet";
import { type Outlet } from "@prisma/client";

  describe("getAllOpen", () => {
    it("returns no outlets if the current time < opening time", () => {
      // mock the current date as a wednesday at 9am
      const date = new Date(2023, 3, 12, 9);

      const mockOutlets = [
        {
          id: "1",
          name: "Outlet 1",
          openingHours: [
            {
              weekday: "wednesday",
              openAt: "10:00",
              closesAt: "00:00",
              closesAtNextDay: true,
            },
          ],
        },
      ] as Outlet[];

      const openOutlets = getAllOpen(mockOutlets, date);
      expect(openOutlets).toHaveLength(0);
    });

    it("returns no outlets if the current time > closing time", () => {
      // mock the current date as a thursday at 1am
      const date = new Date(2023, 3, 13, 1);

      const mockOutlets = [
        {
          id: "1",
          name: "Outlet 1",
          openingHours: [
            {
              weekday: "wednesday",
              openAt: "10:00",
              closesAt: "00:00",
              closesAtNextDay: true,
            },
          ],
        },
      ] as Outlet[];

      const openOutlets = getAllOpen(mockOutlets, date);
      expect(openOutlets).toHaveLength(0);
    });

    it("returns no outlets if the weekday does not match", () => {
      // mock the current date as a thursday at 9am
      const date = new Date(2023, 3, 13, 9);

      const mockOutlets = [
        {
          id: "1",
          name: "Outlet 1",
          openingHours: [
            {
              weekday: "wednesday",
              openAt: "10:00",
              closesAt: "00:00",
              closesAtNextDay: true,
            },
          ],
        },
      ] as Outlet[];

      const openOutlets = getAllOpen(mockOutlets, date);
      expect(openOutlets).toHaveLength(0);
    });
  });

  it("returns no outlets if the current time > closing time and the closesAtNextDay is false", () => {
    // mock the current date as a wednesday at 11am
    const date = new Date(2023, 3, 12, 11);

    const mockOutlets = [
      {
        id: "1",
        name: "Outlet 1",
        openingHours: [
          {
            weekday: "wednesday",
            openAt: "10:00",
            closesAt: "00:00",
            closesAtNextDay: false,
          },
        ],
      },
    ] as Outlet[];

    const openOutlets = getAllOpen(mockOutlets, date);
    expect(openOutlets).toHaveLength(0);
  });

  it("returns outlets if the current time is equal to the opening time", () => {
    // mock the current date as a wednesday at 10am
    const date = new Date(2023, 3, 12, 10);

    const mockOutlets = [
      {
        id: "1",
        name: "Outlet 1",
        openingHours: [
          {
            weekday: "wednesday",
            openAt: "10:00",
            closesAt: "00:00",
            closesAtNextDay: true,
          },
        ],
      },
    ] as Outlet[];

    const openOutlets = getAllOpen(mockOutlets, date);
    expect(openOutlets).toHaveLength(1);
  });

  it("returns outlets if the current time > opening time", () => {
    // mock the current date as a wednesday at 11am
    const date = new Date(2023, 3, 12, 11);

    const mockOutlets = [
      {
        id: "1",
        name: "Outlet 1",
        openingHours: [
          {
            weekday: "wednesday",
            openAt: "10:00",
            closesAt: "00:00",
            closesAtNextDay: true,
          },
        ],
      },
    ] as Outlet[];

    const openOutlets = getAllOpen(mockOutlets, date);
    expect(openOutlets).toHaveLength(1);
  });

  it("returns outlets if the current time > closing time and the closesAtNextDay is true", () => {
    // mock the current date as a wednesday at 11am
    const date = new Date(2023, 3, 12, 11);

    const mockOutlets = [
      {
        id: "1",
        name: "Outlet 1",
        openingHours: [
          {
            weekday: "wednesday",
            openAt: "10:00",
            closesAt: "02:00",
            closesAtNextDay: true,
          },
        ],
      },
    ] as Outlet[];

    const openOutlets = getAllOpen(mockOutlets, date);
    expect(openOutlets).toHaveLength(1);
  });

