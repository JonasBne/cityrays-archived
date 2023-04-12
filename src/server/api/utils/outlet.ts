import { type Outlet } from "@prisma/client";
import { format, isWithinInterval } from "date-fns";

const currentTime = format(new Date(), "HH:mm");
const currentDay = parseInt(format(new Date(), "dd"));
const currentMonth = parseInt(format(new Date(), "MM"));
const currentWeekday = format(new Date(), "EEEE");
const currentYear = parseInt(format(new Date(), "yyyy"));

export const getAllOpen = (outlets: Outlet[]) => {
  const openOutlets = outlets.filter((outlet) => {
    const weekday = outlet.openingHours.find(
      (openingHour) =>
        openingHour.weekday.toLowerCase() === currentWeekday.toLowerCase()
    );

    if (!weekday || !weekday?.closesAt) {
      return false;
    }

    // an outlet is considered to be open if the current time is lower than the closing time
    // or if the outlet closes on the next day then it's also considered open if the current time is greater than the closing time
    if (
      weekday.closesAt > currentTime ||
      (weekday.closesAtNextDay && weekday.closesAt < currentTime)
    ) {
      return true;
    }

    return false;
  });

  return openOutlets;
};

export const getAllSunny = (outlets: Outlet[]) => {
  const sunnyOutlets = outlets.filter((outlet) => {
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
};
