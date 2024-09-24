interface Coord {
    lon: number;
    lat: number;
}

interface Iweather {
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

interface Wind {
    speed: number;
}

interface Sys {
    sunrise: number;
    sunset: number;
}

export interface Data {
    id: number;
    coord: Coord;
    weather: Iweather[];
    main: Main;
    wind: Wind;
    sys: Sys;
    dt: number;
    name: string;
    timezone: number;

}


