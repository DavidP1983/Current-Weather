export const formatWeather = (data) => {
    return `
        🌤 ${data.name}
        
        Temperature: ${Math.round(data.main.temp)}°C
        Feels like: ${Math.round(data.main.feels_like)}°C
        Weather: ${data.weather[0].description}
        Humidity: ${data.main.humidity}%
        Wind: ${data.wind.speed} m/s
    `;
};
