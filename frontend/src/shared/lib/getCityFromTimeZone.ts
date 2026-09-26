export function getCityFromTimeZone(): string | undefined {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZone.split('/').pop();
}
