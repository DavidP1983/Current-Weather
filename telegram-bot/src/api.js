export const getWeather = async (city) => {
    const response = await fetch(
        `http://localhost:5001/api/weather?city=${encodeURIComponent(city)}`,
    );

    if (!response.ok) {
        const error = new Error(`Request failed: ${response.status}`);
        error.status = response.status;

        throw error;
    }

    return response.json();
};
