const TelegramBot = require('node-telegram-bot-api');
const path = require("node:path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const commands = require("./commands/index.js")(bot);


bot.onText(/\/start/, commands.start)

// bot.onText(/\/help/, commands.help)
// bot.onText(/\/friend/, commands.friend)
// bot.onText(/\/socials/, commands.socials)

// @ts-ignore
bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const chatId = message.chat.id;

    if (callbackQuery.data === 'help') {
        commands.help(message)
    }

    if (callbackQuery.data === 'friend') {
        commands.friend(message)
    }

    if (callbackQuery.data === 'socials') {
        commands.socials(message)
    }
});


bot.onText(/\/profile/, commands.profile);



// @ts-ignore
bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;


    if (data === 'invite') {
        commands.invite(message)
    }
});






