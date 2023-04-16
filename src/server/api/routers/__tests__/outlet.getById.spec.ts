/* eslint-disable @typescript-eslint/unbound-method */
import * as outletFixtures from "@/tests/fixtures/outlet";
import { prismaMock } from "libs/__mocks__/prisma";
import { createInnerTRPCContext } from "../../trpc";
import { type AppRouter, appRouter } from "../../root";
import { type inferProcedureInput } from "@trpc/server";

type Input = inferProcedureInput<AppRouter["outlet"]["getById"]>;

describe("getById", () => {
  it("returns an outlet by id", async () => {
    const mockOutlet = outletFixtures.outletSingle();

    prismaMock.outlet.findUnique.mockResolvedValue(mockOutlet);

    const caller = appRouter.createCaller(
      createInnerTRPCContext({ prisma: prismaMock })
    );

    const input: Input = { id: mockOutlet.id };

    const result = await caller.outlet.getById(input);

    expect(prismaMock.outlet.findUnique).toHaveBeenCalledWith({
      where: { id: input.id },
    });
    expect(result).toStrictEqual(mockOutlet);
  });
});
