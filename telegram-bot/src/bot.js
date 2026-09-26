import dotenv from 'dotenv';
import { Bot } from 'node-telegram-bot-api';
import { run } from 'node-telegram-bot-api/node';
import { getWeather } from './api.js';
import { callbackHandlers } from './commandHandlers.js';
import { formatWeather } from './formatWeather.js';
import { getNextRunAt } from './getNextRunAt.js';
import { handleBotError } from './handleBotError.js';
import { Strategy } from './keyboards.js';
import { startServer } from './server.js';
import { validateCity } from './validateCity.js';
import { startWeatherScheduler } from './weatherScheduler.js';

dotenv.config();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

const lastCityByUser = new Map();
const subscriptions = new Map();
const duration = 10 * 1000;
let schedulerTimer = null;

bot.command('start', (ctx) =>
    ctx.reply(
        `Hello!👋
        Send me a city name and I will show you the current weather.
        for example: Montreal`,
    ),
);

// bot.command('help', (ctx) => {
//     ctx.reply('Send me a city name and I will show you the current weather.');
// });

bot.on('message', async (ctx) => {
    if (ctx.message.text === '/start') {
        return;
    }

    try {
        const city = validateCity(ctx.message.text);
        const data = await getWeather(city);

        lastCityByUser.set(ctx.chat.id, city);

        await ctx.reply(
            `${formatWeather(data)}\n\n <b>Would you like to receive weather updates?</b>`,
            { parse_mode: 'HTML', reply_markup: Strategy['subscribe']() },
        );
    } catch (e) {
        console.error(e);

        handleBotError(ctx, e);
    }
});

bot.on('callback_query', async (ctx) => {
    const { data } = ctx.callbackQuery;

    await ctx.answerCallbackQuery(); // Я получил нажатие inline-кнопки

    const handlerMessages = callbackHandlers[data];

    if (handlerMessages) {
        return handlerMessages({
            ctx,
            keyboards: Strategy,
            subscriptions,
            timer: schedulerTimer,
        });
    }

    if (data.startsWith('interval:')) {
        const normalize = data.split(':')[1];
        const [time, unit] = normalize.split(' ');
        const city = lastCityByUser.get(ctx.chatId);

        const nextRunAt = getNextRunAt(time, unit);

        subscriptions.set(ctx.chatId, {
            city,
            interval: Number(time),
            unit,
            nextRunAt,
        });

        if (subscriptions.size === 1) {
            schedulerTimer = startWeatherScheduler({
                bot,
                subscriptions,
                duration,
                getWeather,
                formatWeather,
                getNextRunAt,
                Strategy,
            });
        }

        await ctx.reply(
            `Got it! You will receive weather updates every ${time} ${unit}`,
        );

        console.log(subscriptions);
    }
});

// To deploy bot to Render
startServer();

await run(bot);
