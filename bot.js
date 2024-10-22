const { Telegraf, Markup } = require('telegraf');
const path = require('path');
const fs = require('fs');
require("dotenv").config();
const express = require('express');
const { MainText, Instruction1, Instruction2, urlJet, urlMines } = require('./function');

const app = express();
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VERCEL_URL = process.env.VERCEL_URL;

const bot = new Telegraf(BOT_TOKEN);

// Middleware для обработки JSON
app.use(express.json());

// Функция для проверки Telegram ID пользователя
const checkUserTGId = (userId) => {
    const ids = fs.readFileSync(path.join(__dirname, 'telegramId.txt'), 'utf-8').split('\n');
    return ids.includes(userId.toString().trim());
};

// Установка вебхука
const webhookUrl = `${VERCEL_URL}/${BOT_TOKEN}`;
bot.telegram.setWebhook(webhookUrl)
    .then(() => {
        console.log(`Вебхук установлен: ${webhookUrl}`);
    })
    .catch(err => {
        console.error('Ошибка при установке вебхука:', err);
    });

// Обработка обновлений от Telegram
app.post(`/${BOT_TOKEN}`, (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// Обработчики команд
bot.start((ctx) => MainText(ctx));

bot.action('main', (ctx) => MainText(ctx));
bot.action('jet', (ctx) => sendGameInfo(ctx, 'jet'));
bot.action('mines', (ctx) => sendGameInfo(ctx, 'mines'));
bot.action('instruction1', (ctx) => Instruction1(ctx));
bot.action('instruction2', (ctx) => Instruction2(ctx));

// Функция для отправки информации о игре
function sendGameInfo(ctx, gameType) {
    const imagePath = path.join(__dirname, 'images', gameType === 'jet' ? 'jetTg.jpg' : 'intro_mines.jpg');
    const gameName = gameType === 'jet' ? 'ABUZ LuckyJet' : 'ABUZ Mines';
    const url = gameType === 'jet' ? urlJet : urlMines;
    
    ctx.replyWithPhoto({ source: imagePath })
        .then(() => {
            return ctx.replyWithHTML(
                `🎉 <b>Добро пожаловать в</b> 🔸 <b>${gameName}</b> 🔸!\n\n` +
                '🚀 <i>Это захватывающая гэмблинг игра в букмекерской конторе 1win.</i>\n\n' +
                '🎯 Ваша цель: забрать выигрыш отгадать, где находяться <b>звездочки</b>, а не мины 🚀\n\n' +
                '🤖 Наш бот работает на базе нейросети <b>ChatGPT-4</b>!\n\n' +
                '✅ <b>Что делать дальше?</b>\n' +
                '1. Перейдите в раздел <b>Регистрация</b>.\n' +
                '2. Ознакомьтесь с разделом <b>Инструкция</b> и начните играть!',
                Markup.inlineKeyboard([
                    [Markup.button.url('📱 Регистрация', url)],
                    [Markup.button.callback('📚 Инструкция', gameType === 'jet' ? 'instruction1' : 'instruction2')],
                    [Markup.button.callback('🚀 Выдать сигнал 🚀', `signal${gameType.charAt(0).toUpperCase() + gameType.slice(1)}`)]
                ])
            );
        });
}

// Обработчик кнопки "Проверить регистрацию"
let isWaitingForReferral = false;

bot.action('check_registr', (ctx) => {
    ctx.replyWithPhoto({ source: path.join(__dirname, 'images', 'idWin.jpg') })
        .then(() => ctx.reply("Пожалуйста, отправьте ваш реферальный ID для подтверждения:"))
        .then(() => { isWaitingForReferral = true; })
        .catch(err => {
            console.error('Ошибка при отправке сообщения или обработке:', err);
            ctx.reply('Произошла ошибка, попробуйте снова.');
        });
});

// Обработчик текстовых сообщений
bot.on('text', (ctx) => {
    if (!isWaitingForReferral) return;

    const userMessage = ctx.message.text.trim();
    const telegramId = ctx.from.id;

    // Записываем реферальный ID в файл
    fs.appendFileSync(path.join(__dirname, 'ref.txt'), `${userMessage}\n`);
    fs.appendFileSync(path.join(__dirname, 'telegramId.txt'), `${telegramId}\n`);

    ctx.reply('Ваш реферальный ID подтвержден!', Markup.inlineKeyboard([
        [Markup.button.callback('🚀 Выдать сигнал LuckyJet 🚀', 'signalJet')],
        [Markup.button.callback('🚀 Выдать сигнал Mines 🚀', 'signalMines')]
    ]));

    isWaitingForReferral = false; // Сброс состояния
});

// Обработчики сигналов
const signalMessages = {};

bot.action('signalJet', async (ctx) => handleSignal(ctx, 'jet'));
bot.action('signalMines', async (ctx) => handleSignal(ctx, 'mines'));

// Обработка сигнала
async function handleSignal(ctx, gameType) {
    const userId = ctx.from.id;

    if (!checkUserTGId(userId)) {
        return ctx.reply('Сначала пройдите регистрацию.', Markup.inlineKeyboard([
            [Markup.button.url('📱 Регистрация', gameType === 'jet' ? urlJet : urlMines)],
            [Markup.button.callback('🔙 Проверить регистрацию', 'check_registr')]
        ]));
    }

    try {
        // Удаляем старое сообщение, если оно есть
        if (signalMessages[userId]) {
            await ctx.deleteMessage(signalMessages[userId]);
        }

        const loadingMessage = await ctx.reply('Получаю данные с сервера...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await ctx.deleteMessage(loadingMessage.message_id);

        const randomImagePath = getRandomImagePath(gameType);
        const randomNumber = Math.floor(Math.random() * (999999 - 500000 + 1)) + 500000;
        const randomChange = Math.floor(Math.random() * (99 - 75 + 1)) + 75;

        const newSignalMessage = await ctx.replyWithPhoto(
            { source: randomImagePath },
            { caption: `Game № ${randomNumber} \nChance: ${randomChange}%` }
        );

        signalMessages[userId] = newSignalMessage.message_id;
    } catch (err) {
        console.error('Ошибка при выполнении команды:', err);
        ctx.reply('Произошла ошибка при выполнении команды.');
    }
}

// Функция для получения случайного изображения
function getRandomImagePath(gameType) {
    const imagesDir = path.join(__dirname, `images/${gameType === 'jet' ? 'jetSignal' : 'MinesSignal'}`);
    const files = fs.readdirSync(imagesDir);
    const randomFile = files[Math.floor(Math.random() * files.length)];
    return path.join(imagesDir, randomFile);
}

// Начальный маршрут
app.get('/', (req, res) => {
    res.send('Бот работает');
});

// Экспортируем приложение
module.exports = app;

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
module.exports = app;


// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// botRef.launch();



// // Запуск приложения на указанном порте

// bot.launch(
// );
// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))


