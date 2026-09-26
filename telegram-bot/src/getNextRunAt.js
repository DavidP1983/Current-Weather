export const getNextRunAt = (time, unit) => {
    if (unit === 'minutes') {
        return Date.now() + time * 60 * 1000;
    }
    return Date.now() + time * 60 * 60 * 1000;
};
