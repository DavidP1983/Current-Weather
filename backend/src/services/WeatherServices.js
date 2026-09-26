class WeatherServices {
    async request(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&APPID=${process.env.OPENWEATHER_API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            const error = new Error('Failed to fetch weather data');
            error.status = response.status;
            throw error;
        }
        return response.json();
    }
}

export default new WeatherServices();
