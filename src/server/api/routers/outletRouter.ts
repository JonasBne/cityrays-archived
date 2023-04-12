import { format } from "date-fns";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { currentlyOpenQuery } from "../queries/outlet";
import { getAllSunny } from "../utils/outlet";

// TODO: add
// get outlet by id
// get all outlets (also closed ones)

const currentTime = format(new Date(), "HH:mm");
const currentWeekday = format(new Date(), "EEEE");

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
      const openOutlets = await ctx.prisma.outlet.findMany(
        currentlyOpenQuery(currentWeekday, currentTime)
      );
      return openOutlets;
    } catch (error) {
      console.log("error", error);
    }
  }),
  getAllSunny: publicProcedure.query(async ({ ctx }) => {
    try {
      const openOutlets = await ctx.prisma.outlet.findMany(
        currentlyOpenQuery(currentWeekday, currentTime)
      );
      return getAllSunny(openOutlets);
    } catch (error) {
      console.log("error", error);
    }
  }),
});
