const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
const path = require('path')
const fs = require('fs')
const { MainText, Instruction1, Instruction2, urlJet, urlMines, promoMines, promoJet } = require('./function')

const BOT_TOKEN = "7721755188:AAEVF7gxaY8sm27xwvUqRNfDMc50KQr5WPo"

const BOT_TOKEN_REF='7711874638:AAHWdQVjTi7qiMRi1U09rFqCu3Vh5hbpHRs'


const botRef = new Telegraf(BOT_TOKEN_REF)
const bot = new Telegraf(BOT_TOKEN)


bot.start((ctx) => {
  MainText(ctx)
});

const filePath = path.join(__dirname, 'ref.txt'); // Путь к файлу
const telegramIdFilePath = path.join(__dirname, 'telegramId.txt');


// Обработчик текстовых сообщений
// bot.on('text', (ctx) => {
//     const userMessage = ctx.message.text; // Получаем текст сообщения
//     const telegramId = ctx.from.id

//     const referalId = userMessage.trim(); // Убираем пробелы

//     // Записываем ID реферала в файл
//     fs.appendFile(filePath, `${referalId}\n`, (err) => {
//         if (err) {
//             console.error('Ошибка при сохранении реферального ID:', err);
//             ctx.reply('Не удалось сохранить реферальный ID.');
//         } else {
//             console.log('Реферальный ID сохранен:', referalId);
//             ctx.reply('Ваш реферальный ID потвержден!',
//               Markup.inlineKeyboard([
//                 [Markup.button.callback('🚀 Выдать сигнал LuckyJet🚀', 'signalJet')],
//                 [Markup.button.callback('🚀 Выдать сигнал Mines🚀', 'signalMines')],
              
//               ])
//             );
//         }
//     });
//     fs.appendFile(telegramIdFilePath, `${telegramId}\n`, (err) => {

//           console.log('Реферальный ID сохранен:', referalId);
//       })
// });


// Функция для проверки ID пользователя в файле ref.txt
const checkUserId = (userId) => {
  const filePath = path.join(__dirname, 'ref.txt'); // Путь к вашему файлу
  const ids = fs.readFileSync(filePath, 'utf-8').split('\n'); // Чтение файла и разделение по строкам
  return ids.includes(userId.toString().trim()); // Проверка наличия ID
};

const checkUserTGId = (userId) => {
  const filePath = path.join(__dirname, 'telegramId.txt'); // Путь к вашему файлу
  const ids = fs.readFileSync(filePath, 'utf-8').split('\n'); // Чтение файла и разделение по строкам
  return ids.includes(userId.toString().trim()); // Проверка наличия ID
};


  
  bot.action('main', (ctx) => {
   MainText(ctx)
  });

  bot.action('jet',(ctx)=>{
    const imagePath = path.join(__dirname, 'images', 'jetTg.jpg')
    ctx.replyWithPhoto({ source: imagePath })
    .then(() => {
      return ctx.replyWithHTML(
        '🎉 <b>Добро пожаловать в</b> 🔸 <b>ABUZ LuckyJet</b> 🔸!\n\n' +
        '🚀 <i>LuckyJet — это захватывающая гэмблинг игра в букмекерской конторе 1win</i>, основанная на классическом “Краше”.\n\n' +
        '🎯 Ваша цель: забрать выигрыш <b>раньше</b>, чем ракета улетит! 🚀\n\n' +
        '🤖 Наш бот работает на базе нейросети <b>ChatGPT-4</b> и способен предсказывать сигналы с точностью до <b>93%</b>!\n\n' +
        '❗️ <i>Внимание:</i> бот корректно работает <b>только</b> с аккаунтами 1win, зарегистрированными через раздел "Регистрация" в боте.\n\n' +
        '✅ <b>Что делать дальше?</b>\n' +
        '1. Перейдите в раздел <b>Регистрация</b>.\n' +
        '2. Ознакомьтесь с разделом <b>Инструкция</b> и начните играть!',
        Markup.inlineKeyboard([
          [Markup.button.url('📱 Регистрация', urlJet)],  // Первая кнопка
          [Markup.button.callback('📚 Инструкция', 'instruction1')],                             // Вторая кнопка
          [Markup.button.callback('🚀 Выдать сигнал 🚀', 'signalJet')],                               // Третья кнопка                  // Четвертая кнопка
      ])
   )
    })
  })

  bot.action('mines',(ctx)=>{
    const imagePath = path.join(__dirname, 'images', 'intro_mines.jpg')
    ctx.replyWithPhoto({ source: imagePath })
    .then(() => {
      return ctx.replyWithHTML(
        '🎉 <b>Добро пожаловать в</b> 🔸 <b>ABUZ Mines</b> 🔸!\n\n' +
        '🚀 <i>MInes — это захватывающая гэмблинг игра в букмекерской конторе 1win</i>, основанная на классическом “Краше”.\n\n' +
        '🎯 Ваша цель: забрать выигрыш отгадать где находяться <b>звездочки</b>, а не мины 🚀\n\n' +
        '🤖 Наш бот работает на базе нейросети <b>ChatGPT-4</b> и способен предсказывать сигналы с точностью до <b>93%</b>!\n\n' +
        '❗️ <i>Внимание:</i> бот корректно работает <b>только</b> с аккаунтами 1win, зарегистрированными через раздел "Регистрация" в боте.\n\n' +
        '✅ <b>Что делать дальше?</b>\n' +
        '1. Перейдите в раздел <b>Регистрация</b>.\n' +
        '2. Ознакомьтесь с разделом <b>Инструкция</b> и начните играть!',
    Markup.inlineKeyboard([
        
          [Markup.button.url('📱 Регистрация', urlMines)],
          [Markup.button.callback('📚 Инструкция', 'instruction2')],
          [Markup.button.callback('🚀 Выдать сигнал 🚀', 'signalMines')],
        
    ])
   )
    })
   })

   bot.action('instruction1',(ctx)=>{
    Instruction1(ctx)
   })

   bot.action('instruction2',(ctx)=>{
    Instruction2(ctx)
   })




// Флаг для отслеживания того, что бот ждет реферальный ID
let isWaitingForReferral = false;

// Обработчик кнопки "Проверить регистрацию"
bot.action('check_registr', (ctx) => {
    const imagePath = path.join(__dirname, 'images', 'idWin.jpg'); 
    
    // Отправляем изображение
    ctx.replyWithPhoto({ source: imagePath })
      .then(() => {
        // Отправляем текстовое сообщение после изображения
        return ctx.reply("Пожалуйста, отправьте ваш реферальный ID для подтверждения:");
      })
      .then(() => {
        // Устанавливаем флаг ожидания реферального ID
        isWaitingForReferral = true;
      })
      .catch((err) => {
        console.error('Ошибка при отправке сообщения или обработке:', err);
        ctx.reply('Произошла ошибка, попробуйте снова.');
      });
});

// Обработчик текстовых сообщений
bot.on('text', (ctx) => {
    if (!isWaitingForReferral) {
        // Если бот не ждет реферальный ID, не обрабатываем сообщение
        return;
    }

    const userMessage = ctx.message.text; // Получаем текст сообщения
    const telegramId = ctx.from.id;       // Получаем Telegram ID пользователя
    const referalId = userMessage.trim(); // Убираем лишние пробелы из реферального ID

    // Записываем реферальный ID в файл
    fs.appendFile(filePath, `${referalId}\n`, (err) => {
        if (err) {
            console.error('Ошибка при сохранении реферального ID:', err);
            ctx.reply('Не удалось сохранить реферальный ID.');
        } else {
            console.log('Реферальный ID сохранен:', referalId);
            ctx.reply('Ваш реферальный ID подтвержден!',
                Markup.inlineKeyboard([
                    [Markup.button.callback('🚀 Выдать сигнал LuckyJet 🚀', 'signalJet')],
                    [Markup.button.callback('🚀 Выдать сигнал Mines 🚀', 'signalMines')],
                ])
            );
        }
    });

    // Записываем Telegram ID пользователя в другой файл
    fs.appendFile(telegramIdFilePath, `${telegramId}\n`, (err) => {
        if (err) {
            console.error('Ошибка при сохранении Telegram ID:', err);
        } else {
            console.log('Telegram ID сохранен:', telegramId);
        }
    });

    // Отключаем ожидание реферального ID
    isWaitingForReferral = false;
});

// Функция для получения случайного изображения из папки
function getRandomImagePathMines() {
    const imagesDir = path.join(__dirname, 'images/MinesSignal');
    const files = fs.readdirSync(imagesDir); // Читаем файлы в папке
    const randomFile = files[Math.floor(Math.random() * files.length)]; // Выбираем случайный файл
    return path.join(imagesDir, randomFile); // Возвращаем полный путь к случайному изображению
}

// Создаем объект для хранения ID сообщений с сигналами по каждому пользователю
const signalMessagesLuckyJet = {}; // Объект для хранения ID сообщений

bot.action('signalJet', async (ctx) => {
  const userId = ctx.from.id;

  
  // Проверяем ID пользователя
  if (checkUserTGId(userId)) {
    try {
      // Если у пользователя уже есть сообщение с сигналом, удаляем его
      if (signalMessagesLuckyJet[userId]) {

        try {
          // Пытаемся удалить старое сообщение с сигналом

          await ctx.deleteMessage(signalMessagesLuckyJet[userId]);
        } catch (error) {
          console.error('Ошибка при удалении старого сигнала:', error);
          // Даже если не удалось удалить сообщение, сбрасываем сохраненный ID
          signalMessagesLuckyJet[userId] = null;
        }
      }

      // Отправляем сообщение о загрузке данных
      const loadingMessage = await ctx.reply('Получаю данные с сервера...');

      // Задержка в 3 секунды
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Удаляем сообщение о загрузке
      await ctx.deleteMessage(loadingMessage.message_id);

      // Генерируем случайный номер от 500000 до 999999
      const randomNumber = Math.floor(Math.random() * (999999 - 500000 + 1)) + 500000;
      const randomChange = Math.floor(Math.random() * (99 - 75 + 1)) + 75;

      // Получаем путь к случайному изображению
      const randomImagePath = getRandomImagePathLuckyJet();

      // Отправляем новый сигнал с изображением
      const newSignalMessage = await ctx.replyWithPhoto(
        { source: randomImagePath },
        { caption: `Game № ${randomNumber} \nChance: ${randomChange}%` }
      );

      // Сохраняем ID нового сообщения с сигналом
      signalMessagesLuckyJet[userId] = newSignalMessage.message_id;

    } catch (err) {
      console.error('Ошибка при выполнении команды:', err);
      ctx.reply('Произошла ошибка при выполнении команды.');
    }
  } else {
    ctx.reply('Сначала пройдите регистрацию.',
      Markup.inlineKeyboard([
        [Markup.button.url('📱 Регистрация', urlJet)],
        [Markup.button.callback('🔙 Проверить регистрацию', 'check_registr')],
      ])
    );
  }
});

bot.action('signalMines', async (ctx) => {
  const userId = ctx.from.id;

  
  // Проверяем ID пользователя
  if (checkUserTGId(userId)) {
    try {
      // Если у пользователя уже есть сообщение с сигналом, удаляем его
      if (signalMessagesLuckyJet[userId]) {

        try {
          // Пытаемся удалить старое сообщение с сигналом

          await ctx.deleteMessage(signalMessagesLuckyJet[userId]);
        } catch (error) {
          console.error('Ошибка при удалении старого сигнала:', error);
          // Даже если не удалось удалить сообщение, сбрасываем сохраненный ID
          signalMessagesLuckyJet[userId] = null;
        }
      }

      // Отправляем сообщение о загрузке данных
      const loadingMessage = await ctx.reply('Получаю данные с сервера...');

      // Задержка в 3 секунды
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Удаляем сообщение о загрузке
      await ctx.deleteMessage(loadingMessage.message_id);

      // Генерируем случайный номер от 500000 до 999999
      const randomNumber = Math.floor(Math.random() * (999999 - 500000 + 1)) + 500000;
      const randomChange = Math.floor(Math.random() * (99 - 75 + 1)) + 75;

      // Получаем путь к случайному изображению
      const randomImagePath = getRandomImagePathMines();

      // Отправляем новый сигнал с изображением
      const newSignalMessage = await ctx.replyWithPhoto(
        { source: randomImagePath },
        { caption: `Game № ${randomNumber} \nChance: ${randomChange}%` }
      );

      // Сохраняем ID нового сообщения с сигналом
      signalMessagesLuckyJet[userId] = newSignalMessage.message_id;

    } catch (err) {
      console.error('Ошибка при выполнении команды:', err);
      ctx.reply('Произошла ошибка при выполнении команды.');
    }
  } else {
    ctx.reply('Сначала пройдите регистрацию.',
      Markup.inlineKeyboard([
        [Markup.button.url('📱 Регистрация', urlJet)],
        [Markup.button.callback('🔙 Проверить регистрацию', 'check_registr')],
      ])
    );
  }
});

// Функция для получения случайного изображения из папки
function getRandomImagePathLuckyJet() {
  const imagesDir = path.join(__dirname, 'images/jetSignal');
  const files = fs.readdirSync(imagesDir); // Читаем файлы в папке
  const randomFile = files[Math.floor(Math.random() * files.length)]; // Выбираем случайный файл
  return path.join(imagesDir, randomFile); // Возвращаем полный путь к случайному изображению
}

bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
botRef.launch();
bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
