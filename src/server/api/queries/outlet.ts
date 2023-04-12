export const currentlyOpenQuery = (
  currentWeekday: string,
  currentTime: string
) => {
  return {
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
  };
};
