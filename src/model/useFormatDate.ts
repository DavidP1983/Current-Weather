import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useMemo, useState } from 'react';
import * as SunCalc from 'suncalc';
import { getLocalTime } from '../shared/lib/getLocalTime';
dayjs.extend(customParseFormat);

interface Timestamp {
  sunriseToLocalTime: string;
  sunsetToLocalTime: string;
  currentDate: string;
}

export const useFormatDate = (
  lat: number,
  lon: number,
  timeZone: number
): Timestamp => {
  const [currentDate, setCurrentDate] = useState<string>(() =>
    dayjs(getLocalTime(timeZone)).format('MMMM D, dddd HH:mm')
  );

  const localTime = getLocalTime(timeZone);

  const sunriseToLocalTime = useMemo(() => {
    const times = SunCalc.getTimes(new Date(localTime), lon, lat);
    const date = dayjs(times.sunrise).format('HH:mm');
    return date;
  }, [lat, lon, localTime]);

  const sunsetToLocalTime = useMemo(() => {
    const times = SunCalc.getTimes(new Date(localTime), lon, lat);
    const date = dayjs(times.sunset).format('HH:mm');
    return date;
  }, [lat, lon, localTime]);

  // Current Date
  useEffect(() => {
    const updateCurrentDate = () => {
      const date = dayjs(getLocalTime(timeZone)).format('MMMM D, dddd HH:mm');
      setCurrentDate(date);
    };

    const now = new Date();

    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      updateCurrentDate();

      interval = setInterval(updateCurrentDate, 60000);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [timeZone]);

  return { sunriseToLocalTime, sunsetToLocalTime, currentDate };
};
