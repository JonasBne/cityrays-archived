import { format, isWithinInterval } from "date-fns";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { currentlyOpenQuery } from "../queries/outlet";

const currentTime = format(new Date(), "HH:mm");
const currentWeekday = format(new Date(), "EEEE");
const currentDay = parseInt(format(new Date(), "dd"));
const currentMonth = parseInt(format(new Date(), "MM"));
const currentYear = parseInt(format(new Date(), "yyyy"));

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

      const sunnyOutlets = openOutlets.filter((outlet) => {
        // first we need to find the sunlightHours object where the period includes
        // the current date
        const sunlightHoursForCurrentPeriod = outlet.sunlightHours.find(
          (sunlightHours) => {
            const startDate = sunlightHours.startDate.split("/");
            const startDateDay = parseInt(startDate[0] as string);
            const startDateMonth = parseInt(startDate[1] as string);

            const endDate = sunlightHours.endDate.split("/");
            const endDateDay = parseInt(endDate[0] as string);
            const endDateMonth = parseInt(endDate[1] as string);

            return isWithinInterval(
              new Date(currentYear, currentMonth, currentDay),
              {
                start: new Date(currentYear, startDateMonth, startDateDay),
                end: new Date(currentYear, endDateMonth, endDateDay),
              }
            );
          }
        );

        // if there is no match found we should not return the outlet
        if (!sunlightHoursForCurrentPeriod) {
          return false;
        }

        // once we have the sunlight hours for the current period we can look for the sunshine value
        // in the outletSunlightHours for the correct timeslot and see if it's sunny (i.e. value > 0)
        const sunshineForCurrentTime =
          sunlightHoursForCurrentPeriod.outletSunlightHours.find(
            (outletSunlightHours) =>
              currentTime >= outletSunlightHours.startTime &&
              currentTime <= outletSunlightHours.endTime
          )?.sunShine ?? 0;

        // return the outlet if it has sunshine
        return sunshineForCurrentTime > 0 ? true : false;
      });

      return sunnyOutlets;
    } catch (error) {
      console.log("error", error);
    }
  }),
});
