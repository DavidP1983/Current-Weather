export const getLocalTime = (timeZone: number): number => {
  const timezoneOffset = timeZone;
  const timezoneInHours = timezoneOffset / 3600;

  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const offset = timezoneInHours;
  const currentTime = utc + 3600000 * offset;
  return currentTime;
};
