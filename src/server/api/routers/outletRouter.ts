import { format } from "date-fns";
import { createTRPCRouter, publicProcedure } from "../trpc";

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

      const openOutlets = await ctx.prisma.outlet.findMany({
        where: {
          AND: [
            {
              // find outlets that are open on the current weekday
              openingHours: {
                some: { weekday: currentWeekday.toLowerCase() },
              },
            },
            {
              openingHours: {
                some: {
                  OR: [
                    // the outlet is open if the closesAt time is greater than the current time
                    {
                      closesAt: { gt: currentTime },
                    },
                    // or the outlet is open if it closes on the next day (after midnight) and the
                    // current time is lower than the closesAt time
                    {
                      closesAt: { lt: currentTime },
                      closesAtNextDay: true,
                    },
                  ],
                },
              },
            },
          ],
        },
      });

      return openOutlets;
    } catch (error) {
      console.log("error", error);
    }
  }),
});
