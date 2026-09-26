export const startWeatherScheduler = (props) => {
    const {
        bot,
        subscriptions,
        duration,
        getWeather,
        formatWeather,
        getNextRunAt,
        Strategy,
    } = props;

    return setInterval(async () => {
        console.log('start timer');
        const now = Date.now();
        for (const [chatId, subscription] of subscriptions) {
            if (subscription.nextRunAt <= now) {
                console.log('Time to send update:', chatId, subscription);

                try {
                    const data = await getWeather(subscription.city);
                    const message = formatWeather(data);

                    await bot.api.sendMessage({
                        chat_id: chatId,
                        text: message,
                        reply_markup: Strategy['unsubscribe'](),
                    });

                    subscription.nextRunAt = getNextRunAt(
                        subscription.interval,
                        subscription.unit,
                    );
                } catch (e) {
                    console.error('Failed to send weather update:', e);
                }
            }
        }
    }, duration);
};
