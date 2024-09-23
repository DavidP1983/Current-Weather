import { useMemo } from "react";

interface RoundDate {
    mainTemp: number;
    tempMax: number;
    tempMin: number;
    feelsLike: number;
}

export const useRoundDate = <T extends number>(temp: T, max: T, min: T, feels: T): RoundDate => {

    const roundDate = useMemo(() => {

        const mainTemp = Math.round(temp);
        const tempMax = Math.round(max);
        const tempMin = Math.round(min);
        const feelsLike = Math.round(feels);

        return { mainTemp, tempMax, tempMin, feelsLike }
    }, [temp, max, min, feels]);

    return roundDate
}