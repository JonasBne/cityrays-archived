/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as outletFixtures from "@/tests/fixtures/outlet";
import { appRouter } from "../../root";
import { createInnerTRPCContext } from "../../trpc";
import { prismaMock } from "libs/__mocks__/prisma";

describe("getAll", () => {
  it("returns all outlets", async () => {
    const mockOutlets = outletFixtures.outletShortList();
    prismaMock.outlet.findMany.mockResolvedValue(mockOutlets);

    const caller = appRouter.createCaller(
      createInnerTRPCContext({ prisma: prismaMock })
    );

    const result = await caller.outlet.getAll();

    expect(prismaMock.outlet.findMany).toHaveBeenCalled();
    expect(result).toHaveLength(mockOutlets.length);
    expect(result?.[0]?.id).toBe(mockOutlets?.[0]?.id);
    expect(result?.[0]?.name).toBe(mockOutlets?.[0]?.name);
  });
});
