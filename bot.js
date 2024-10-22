const { Telegraf, Markup } = require('telegraf');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const express = require('express');
const {
  MainText,
  Instruction1,
  Instruction2,
  urlJet,
  urlMines,
} = require('./function');

const app = express();
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VERCEL_URL = process.env.VERCEL_URL;

const bot = new Telegraf(BOT_TOKEN);
app.use(express.json());

// Файлы для хранения данных
const filePath = path.join(__dirname, 'ref.txt');
const telegramIdFilePath = path.join(__dirname, 'telegramId.txt');

// Флаг ожидания реферального ID
let isWaitingForReferral = false;

// Функция для чтения ID из файла
const readIdsFromFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf-8').split('\n').map(id => id.trim());
};

// Проверка наличия пользователя в системе
const checkUserTGId = (userId) => {
  const ids = readIdsFromFile(telegramIdFilePath);
  return ids.includes(userId.toString());
};

// Обработчик команды /start
bot.start((ctx) => {
  MainText(ctx);
});

// Обработчики действий
bot.action('main', (ctx) => MainText(ctx));
bot.action('jet', (ctx) => sendWelcomeMessage(ctx, 'jet'));
bot.action('mines', (ctx) => sendWelcomeMessage(ctx, 'mines'));
bot.action('instruction1', (ctx) => Instruction1(ctx));
bot.action('instruction2', (ctx) => Instruction2(ctx));
bot.action('check_registr', (ctx) => handleCheckRegistration(ctx));

// Основная логика отправки приветственного сообщения
const sendWelcomeMessage = (ctx, gameType) => {
  const images = {
    jet: path.join(__dirname, 'images', 'jetTg.jpg'),
    mines: path.join(__dirname, 'images', 'intro_mines.jpg'),
  };

  const texts = {
    jet: '🎉 <b>Добро пожаловать в</b> 🔸 <b>ABUZ LuckyJet</b> 🔸!\n\n' +
      '🚀 <i>LuckyJet — это захватывающая гэмблинг игра в букмекерской конторе 1win</i>...',
    mines: '🎉 <b>Добро пожаловать в</b> 🔸 <b>ABUZ Mines</b> 🔸!\n\n' +
      '🚀 <i>MInes — это захватывающая гэмблинг игра в букмекерской конторе 1win</i>...',
  };

  ctx.replyWithPhoto({ source: images[gameType] })
    .then(() => ctx.replyWithHTML(texts[gameType], Markup.inlineKeyboard([
      [Markup.button.url('📱 Регистрация', gameType === 'jet' ? urlJet : urlMines)],
      [Markup.button.callback('📚 Инструкция', gameType === 'jet' ? 'instruction1' : 'instruction2')],
      [Markup.button.callback('🚀 Выдать сигнал 🚀', gameType === 'jet' ? 'signalJet' : 'signalMines')]
    ])));
};

// Обработчик ожидания реферального ID
bot.action('check_registr', (ctx) => {
  const imagePath = path.join(__dirname, 'images', 'idWin.jpg');
  ctx.replyWithPhoto({ source: imagePath })
    .then(() => ctx.reply("Пожалуйста, отправьте ваш реферальный ID для подтверждения:"))
    .then(() => {
      isWaitingForReferral = true;
    });
});

// Обработчик текстовых сообщений
bot.on('text', (ctx) => {
  if (!isWaitingForReferral) return;

  const userMessage = ctx.message.text.trim();
  const telegramId = ctx.from.id;

  fs.appendFile(filePath, `${userMessage}\n`, (err) => {
    if (err) {
      console.error('Ошибка при сохранении реферального ID:', err);
      ctx.reply('Не удалось сохранить реферальный ID.');
    } else {
      ctx.reply('Ваш реферальный ID подтвержден!', Markup.inlineKeyboard([
        [Markup.button.callback('🚀 Выдать сигнал LuckyJet 🚀', 'signalJet')],
        [Markup.button.callback('🚀 Выдать сигнал Mines 🚀', 'signalMines')]
      ]));

      // Запись Telegram ID пользователя
      fs.appendFile(telegramIdFilePath, `${telegramId}\n`, (err) => {
        if (err) console.error('Ошибка при сохранении Telegram ID:', err);
      });
    }
  });

  isWaitingForReferral = false;
});

// Отправка сигнала (примеры)
const signalHandler = async (ctx, gameType) => {
  const userId = ctx.from.id;

  if (!checkUserTGId(userId)) {
    return ctx.reply('Сначала пройдите регистрацию.', Markup.inlineKeyboard([
      [Markup.button.url('📱 Регистрация', gameType === 'jet' ? urlJet : urlMines)],
      [Markup.button.callback('🔙 Проверить регистрацию', 'check_registr')]
    ]));
  }

  // Здесь ваша логика генерации и отправки сигнала
  // Пример с использованием заглушек для демонстрации
  const randomImagePath = getRandomImagePath(gameType);
  const randomNumber = Math.floor(Math.random() * (999999 - 500000 + 1)) + 500000; // Обновите диапазон по вашему усмотрению
  await ctx.replyWithPhoto({ source: randomImagePath }, { caption: `Game № ${randomNumber}` });
};

// Вызовы сигналов
bot.action('signalJet', (ctx) => signalHandler(ctx, 'jet'));
bot.action('signalMines', (ctx) => signalHandler(ctx, 'mines'));

// Генерация случайного изображения
const getRandomImagePath = (gameType) => {
  const imagesDir = path.join(__dirname, `images/${gameType === 'jet' ? 'jetSignal' : 'MinesSignal'}`);
  const files = fs.readdirSync(imagesDir);
  const randomFile = files[Math.floor(Math.random() * files.length)];
  return path.join(imagesDir, randomFile);
};

// Настройка вебхука
const setupWebhook = () => {
  const webhookUrl = `${VERCEL_URL}/${BOT_TOKEN}`;
  bot.telegram.setWebhook(webhookUrl)
    .then(() => console.log(`Вебхук установлен: ${webhookUrl}`))
    .catch(err => console.error('Ошибка при установке вебхука:', err));
};

// Запуск вебхука
if (!VERCEL_URL) {
  console.error('Ошибка: VERCEL_URL не определена. Убедитесь, что вы настроили переменные окружения в Vercel.');
} else {
  setupWebhook();
}

// Обработка входящих обновлений
app.post(`/${BOT_TOKEN}`, (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

// Основной маршрут
app.get('/', (req, res) => {
  res.send('Бот работает');
});

// Экспорт приложения
module.exports = app;
