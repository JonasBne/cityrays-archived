import { type Outlet } from "@prisma/client";
import { format, intervalToDuration, isWithinInterval } from "date-fns";

// instead of calling the new Date() here we pass it in as a prop
// so we can reliably test these utils functions based on a mocked date

export const getAllOpen = (outlets: Outlet[], date = new Date()) => {
  const currentTime = format(date, "HH:mm");
  const currentWeekday = format(date, "EEEE");

  const openOutlets = outlets.filter((outlet) => {
    const weekday = outlet.openingHours.find(
      (openingHour) =>
        openingHour.weekday.toLowerCase() === currentWeekday.toLowerCase()
    );

    if (!weekday || !weekday.closesAt || !weekday.openAt) {
      return false;
    }

    // an outlet is considered to be open if:
    // the current time is lower than the closing time
    // the outlet closes on the next day and if the current time is greater than the closing time and if the opening time is lower than the current time
    if (
      weekday.closesAt > currentTime ||
      (weekday.closesAtNextDay &&
        weekday.closesAt < currentTime &&
        weekday.openAt <= currentTime)
    ) {
      return true;
    }

    return false;
  });

  return openOutlets;
};

export const getAllSunny = (outlets: Outlet[], date = new Date()) => {
  const currentTime = format(date, "HH:mm");
  const currentDay = parseInt(format(date, "dd"));
  const currentMonth = parseInt(format(date, "MM"));
  const currentYear = parseInt(format(date, "yyyy"));

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
      )?.sunshine ?? 0;

    // return the outlet if it has sunshine
    return sunshineForCurrentTime > 0 ? true : false;
  });

  return sunnyOutlets;
};

export const getRemainingOpenTime = (openOutlet: Outlet, date = new Date()) => {
  const currentTime = format(date, "HH:mm");
  const currentWeekday = format(date, "EEEE");

  const { openingHours } = openOutlet;

  const openingHoursCurrentWeekday = openingHours.find(
    (openingHour) =>
      openingHour.weekday.toLowerCase() === currentWeekday.toLowerCase()
  );

  if (!openingHoursCurrentWeekday || !openingHoursCurrentWeekday.openAt) {
    return null;
  }

  // because we're working with strings we need to convert the timestamps (in HH:mm format) to Date objects
  // the year, month and day are irrelevant for this calculation so we can use any date, we're only interested in the
  // actual hours and minutes
  const currentTimeDate = new Date(`2000-01-01T${currentTime}`);
  const outletClosingTimeDate = openingHoursCurrentWeekday.closesAt
    ? new Date(`2000-01-01T${openingHoursCurrentWeekday.closesAt}`)
    : null;

  if (!outletClosingTimeDate) {
    return null;
  }

  const diff = intervalToDuration({
    start: currentTimeDate,
    end: outletClosingTimeDate,
  });

  return diff;
};
