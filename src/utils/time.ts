export const getSecondsSinceMidgnight = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hoursInSeconds = Number(hours) * 60 * 60;
  const minutesInSeconds = Number(minutes) * 60;

  return hoursInSeconds + minutesInSeconds;
};
