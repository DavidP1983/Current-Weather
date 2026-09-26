export const callbackHandlers = {
    'subscribe:no': async ({ ctx }) => {
        await ctx.reply('Okay! You can subscribe anytime.');
    },
    'subscribe:yes': async ({ ctx, keyboards }) => {
        await ctx.reply('How often would you like to receive updates?', {
            reply_markup: keyboards['options'](),
        });
    },
    'subscription:unsubscribe': async ({ ctx, subscriptions, timer }) => {
        subscriptions.delete(ctx.chatId);

        if (subscriptions.size === 0) {
            console.log('stop timer');
            clearInterval(timer);
            timer = null;
        }

        await ctx.reply('You have been unsubscribed from weather updates.');
    },
    'subscription:change': async ({ ctx, keyboards }) => {
        await ctx.reply('How often would you like to receive updates?', {
            reply_markup: keyboards['options'](),
        });
    },
};
