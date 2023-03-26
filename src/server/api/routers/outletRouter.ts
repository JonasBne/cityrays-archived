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
              openingHours: {
                some: { weekday: currentWeekday.toLowerCase() },
              },
            },
            {
              openingHours: {
                some: {
                  OR: [
                    {
                      closesAt: { gt: currentTime },
                    },
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
