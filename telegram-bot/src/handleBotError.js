export const handleBotError = async (ctx, e) => {
    if (e.code === 'CHAR') {
        await ctx.reply('Only letters available');
        return;
    }
    if (e.status === 404) {
        await ctx.reply('City not found, try another one');
        return;
    }
    await ctx.reply('Failed to get weather data');
};
