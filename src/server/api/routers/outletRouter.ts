import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
// import { getAllOpen, getAllSunny } from "../utils/outlet";

export const outletRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.outlet.findUnique({
        where: { id: input.id },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.outlet.findMany();
    } catch (error) {
      console.log("error", error);
    }
  }),
  getAllOpen: publicProcedure.query(async ({ ctx }) => {
    try {
      const outlets = await ctx.prisma.outlet.findMany();
      // return getAllOpen(outlets);
    } catch (error) {
      console.log("error", error);
    }
  }),
  getAllSunny: publicProcedure.query(async ({ ctx }) => {
    try {
      const outlets = await ctx.prisma.outlet.findMany();
      // const openOutlets = getAllOpen(outlets);
      // return getAllSunny(openOutlets);
    } catch (error) {
      console.log("error", error);
    }
  }),
  // this is an example of protected procedure that needs
  // an authenticated user to access
  getSecretMessage: protectedProcedure.query(() => {
    return {
      message: "you can now see the secret message",
    };
  }),
});
