import dotenv from 'dotenv';
dotenv.config();

export const getWeather = async (city) => {
    const response = await fetch(
        `${process.env.API_URL}/api/weather?city=${encodeURIComponent(city)}`,
    );

    if (!response.ok) {
        const error = new Error(`Request failed: ${response.status}`);
        error.status = response.status;

        throw error;
    }

    return response.json();
};
