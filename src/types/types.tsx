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


// https://api.openweathermap.org/data/3.0/onecall?lat=45.5031824&lon=73.5698065&units=metric&lang=ru&exclude=hourly,daily&appid=b98a267c17bbcf7809ef855fcc0f7776
// http://api.openweathermap.org/geo/1.0/direct?q=Montreal&limit=1&appid=b98a267c17bbcf7809ef855fcc0f7776

//https://api.openweathermap.org/data/2.5/weather?q=Montreal&units=metric&lang=ru&exclude=hourly,daily&APPID=b98a267c17bbcf7809ef855fcc0f7776