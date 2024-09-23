import { match } from 'ts-pattern';
import * as weatherIcon from '../assets/index';

type Tvalue = string;

export const getUrl = (value: Tvalue) =>
    match(value)
        .with('01d', () => weatherIcon.clear_d)
        .with('01n', () => weatherIcon.clear_n)
        .with('02d', () => weatherIcon.few_clouds_d)
        .with('02n', () => weatherIcon.few_clouds_n)
        .with('03d', "03n", () => weatherIcon.clouds)
        .with('04d', '04n', () => weatherIcon.broken_clouds)
        .with('09d', '09n', () => weatherIcon.shower_rain)
        .with('10d', () => weatherIcon.rain_d)
        .with('10n', () => weatherIcon.rain_n)
        .with('11d', '11n', () => weatherIcon.thunderstorm)
        .with('13d', () => weatherIcon.snow_d)
        .with('13n', () => weatherIcon.snow_n)
        .with('50d', '50n', () => weatherIcon.fog)
        .otherwise(() => '');

