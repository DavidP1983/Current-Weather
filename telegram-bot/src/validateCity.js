export const validateCity = (city) => {
    if (!/[a-zа-яё]/i.test(city)) {
        const error = new Error('Only letters available');
        error.code = 'CHAR';

        throw error;
    }
    const data = city.trim();

    return data;
};
