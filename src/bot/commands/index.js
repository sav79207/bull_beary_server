
const config = require("../config/config.json");
const { join } = require('path');
const User = require("../../models/User.js");
const {login} = require("../../controllers/users");


const web_app_url = process.env.WEB_APP_URL
const BOT_TOKEN = process.env.BOT_TOKEN



const checkAndSaveUser = async (user) => {
    try {
        const existingUser = await User.findOne({ where: { tg_user_id: user.tg_user_id } });

        if (existingUser) {
            await existingUser.update(user);
            console.log('User updated in database');
        } else {
            await User.create(user);
            console.log('User created in database');
        }
    } catch (error) {
        console.error('Error saving user:', error);
    }
}
module.exports = function (bot) {
    return {
        start: async (msg) => {
            const chatId = msg.chat.id
            let photo
            const refId = msg.text.split(' ')[1]

            const userProfilePhotos = await bot.getUserProfilePhotos(chatId)
            if ( userProfilePhotos.photos.length > 0) {
                photo = userProfilePhotos.photos[0].pop()
            }

            const user = {
                tg_user_id: msg.from.id,
                first_name: msg.from.first_name,
                language_code: msg.from.language_code,
                refId: refId ? refId : null,
                tg_file_id: photo.file_id ? photo.file_id : null
            }

            await checkAndSaveUser(user)

            const imgPath = join(__dirname, '../assets', 'start-pc.jpg');
            await bot.sendPhoto(chatId, imgPath, {
                caption: config.MESSAGES.START.TEXT.replace("<USER_NAME>", msg.from.first_name),
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: '👏 Start now!', web_app: { url: web_app_url } }],
                        [{ text: '🔗 Join community', url: 'https://google.com' }],
                        [{ text: '❓ Help', callback_data: 'help' }]
                    ]
                })
            });
        },
        // help: async function (msg)  {
        //     const chatId = msg.chat.id;
        //
        //     const opts = {
        //         caption: config.MESSAGES.HELP.TEXT,
        //         reply_markup: JSON.stringify({
        //             inline_keyboard: [
        //                 [{ text: '👏 Start now!', web_app: { url: web_app_url } }]
        //             ]
        //         })
        //     };
        //
        //     // Шлях до вашої локальної картинки
        //     const imgPath = join(__dirname, '../assets', 'help-pc.jpg');
        //
        //     // Відправлення картинки разом з інлайн клавіатурою
        //     bot.sendPhoto(chatId, imgPath, opts);
        // },
        // profile: async function (msg) {
        //     const chatId = msg.chat.id;
        //     const fromUser = msg.from;
        //     const userId = fromUser.id;
        //     const userName = fromUser.username ? `@${fromUser.username}` : `${fromUser.first_name} ${fromUser.last_name}`;
        //
        //     // ... інший код ...
        //
        //     // Ваш текстовий шаблон для повідомлення профілю
        //
        //
        //     const opts = {
        //         reply_markup: JSON.stringify({
        //             inline_keyboard: [
        //                 [{ text: 'Invite friends', callback_data: 'invite' }],
        //                 [{ text: '👏 Play', web_app: { url: web_app_url } }]
        //             ]
        //         })
        //     };
        //
        //     bot.sendMessage(chatId, config.MESSAGES.PROFILE.TEXT.replace("<USER_NAME>", userName), opts);
        // },
        //
        // invite: async function (msg) {
        //     const chatId = msg.chat.id;
        //
        //     const opts = {
        //         reply_markup: JSON.stringify({
        //             inline_keyboard: [
        //                 [{ text: 'Invite friends', url: `https://t.me/tapswap_mirror_bot?start=r_${msg.from.id}&text=🎁 +2.5k Shares as a first-time gift` }],
        //                 [{ text: '👏 Play', web_app: { url: web_app_url } }]
        //             ]
        //         })
        //     };
        //
        //     bot.sendMessage(chatId, config.MESSAGES.INVITE.TEXT, opts);
        // },
        // friend: async function (msg) {
        //     const chatId = msg.chat.id;
        //     const userId = msg.from.id;
        //
        //     bot.sendMessage(chatId, config.MESSAGES.FRIEND.TEXT.replace("<ID>", userId));
        // },
        // socials: async function (msg) {
        //     const chatId = msg.chat.id;
        //     const fromUser = msg.from;
        //     const userId = fromUser.id;
        //     const userName = fromUser.username ? `@${fromUser.username}` : `${fromUser.first_name} ${fromUser.last_name}`;
        //
        //     // ... інший код ...
        //
        //     // Ваш текстовий шаблон для повідомлення профілю
        //
        //
        //     const opts = {
        //         reply_markup: JSON.stringify({
        //             inline_keyboard: [
        //                 [{ text: 'TapSwap Community', url: 'https://google.com' }],
        //                 [{ text: 'TapSwap on X', url: 'https://google.com' }],
        //                 [{ text: 'TapSwap site', url: 'https://google.com' }],
        //                 [{ text: '👏 Play', web_app: { url: web_app_url } }]
        //             ]
        //         })
        //     };
        //
        //     bot.sendMessage(chatId, config.MESSAGES.SOCIALS.TEXT, opts);
        // }
    }
}
