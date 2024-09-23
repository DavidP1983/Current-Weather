import { useMemo, useEffect, useState } from "react";
import dayjs from "dayjs";
import SunCalc from 'suncalc';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);


interface Timestamp {
    sunriseToLocalTime: string;
    sunsetToLocalTime: string;
    currentDate: string;
}



export const useFormatDate = <T extends number>(lat: T, lon: T, timeZone: T): Timestamp => {
    const [currentDate, setCurrentDate] = useState<string>('');

    const showLocalTime = () => {
        const timezoneOffset = timeZone;
        const timezoneInHours = timezoneOffset / 3600;

        const d = new Date();
        const localTime = d.getTime();
        const localOffset = d.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        const offset = timezoneInHours;
        const currentTime = utc + (3600000 * offset);
        return currentTime;
    }


    const sunriseToLocalTime = useMemo(() => {

        let times = SunCalc.getTimes(new Date(showLocalTime()), lon, lat);
        const date = dayjs(times.sunrise).format("HH:mm");
        return date

    }, [lat, lon]);

    const sunsetToLocalTime = useMemo(() => {
        let times = SunCalc.getTimes(new Date(showLocalTime()), lon, lat);
        const date = dayjs(times.sunset).format("HH:mm");
        return date

    }, [lat, lon]);

    useEffect(() => {
        let date = new Date();
        let timer = setTimeout(function () {
            setInterval(startTimer, 60000);
            startTimer();
        }, (60 - date.getSeconds()) * 1000);
        startTimer();
        function startTimer() {
            console.log('timer');
            const date = dayjs(showLocalTime()).format("MMMM D, dddd HH:mm");
            setCurrentDate(date);
        }

        return () => {
            console.log('clear timer');
            clearInterval(timer);
        }

    }, [currentDate])


    return { sunriseToLocalTime, sunsetToLocalTime, currentDate }
}
