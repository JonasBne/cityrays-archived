import { format } from "date-fns";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { currentlyOpenQuery } from "../queries/outlet";

export const outletRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.outlet.findMany();
    } catch (error) {
      console.log("error", error);
    }
  }),
  getAllOpen: publicProcedure.query(async ({ ctx }) => {
    try {
      const currentTime = format(new Date(), "HH:mm");
      const currentWeekday = format(new Date(), "EEEE");

      const openOutlets = await ctx.prisma.outlet.findMany(
        currentlyOpenQuery(currentWeekday, currentTime)
      );

      return openOutlets;
    } catch (error) {
      console.log("error", error);
    }
  }),
});
