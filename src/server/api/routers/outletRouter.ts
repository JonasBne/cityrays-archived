import { createTRPCRouter, publicProcedure } from "../trpc";

export const outletRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.outlet.findMany();
    } catch (error) {
      console.log("error", error);
    }
  }),
});
