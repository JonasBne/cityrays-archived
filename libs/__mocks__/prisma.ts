import { type PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

// reset the prisma client mock between each individual test
beforeEach(() => {
  mockReset(prismaMock);
});

// creates and exports a deep mock of the prisma client (including nested object properties)
export const prismaMock = mockDeep<PrismaClient>();

export type PrismaMock = typeof prismaMock;
