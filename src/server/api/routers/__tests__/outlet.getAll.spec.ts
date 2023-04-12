import { prismaMock } from "libs/__mocks__/prisma";
import { appRouter } from "../../root";
import { vi } from "vitest";
import { createTRPCContext } from "../../trpc";

vi.mock("../libs/prisma");

describe("getAll", () => {
  test("returns all outlets", async () => {
    // session can be null since it's a public route
    const caller = appRouter.createCaller({
      session: null,
      prisma: prismaMock,
    });

    const mockOutput = [
      {
        id: "1",
        name: "test",
        street: "test",
        city: "test",
        houseNumber: 1,
        zipCode: 1,
        location: {
          type: "Point",
          coordinates: [1, 1],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: "test",
        sunlightHours: [],
        openingHours: [],
      },
    ];

    prismaMock.outlet.findMany.mockResolvedValue(mockOutput);

    // const result = await caller.outlet.getAll();
  });
});
