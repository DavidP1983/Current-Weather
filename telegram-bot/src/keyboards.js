import { InlineKeyboardBuilder } from 'node-telegram-bot-api';

const subscribe = () => {
    return new InlineKeyboardBuilder()
        .text('Yes', 'subscribe:yes')
        .text('No', 'subscribe:no')
        .build();
};

const subscribeOptions = () => {
    return new InlineKeyboardBuilder()
        .text('2 minutes', 'interval:2 minutes')
        .row()
        .text('1 hour', 'interval:1 hours')
        .text('2 hours', 'interval:2 hours')
        .row()
        .text('6 hours', 'interval:6 hours')
        .text('12 hours', 'interval:12 hours')
        .row()
        .text('24 hours', 'interval:24 hours')
        .build();
};

const unsubscribeChange = () => {
    return new InlineKeyboardBuilder()
        .text('Change interval', 'subscription:change')
        .text('Unsubscribe', 'subscription:unsubscribe')
        .build();
};

export const Strategy = {
    subscribe: () => subscribe(),
    options: () => subscribeOptions(),
    unsubscribe: () => unsubscribeChange(),
};
