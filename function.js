 
 const { Telegraf, Markup } = require('telegraf')
 const { message } = require('telegraf/filters')
 const path = require('path')
 const fs = require('fs');





const urlJet = 'https://1wzvro.top/v3/lucky-jet-updated?p=ld6s'; // Ссылка на Jet
 const urlMines = 'https://1wzvro.top/v3/2158/1win-mines?p=6md7'; // Ссылка на Mines
 const promoJet = 'JETPROMO22'; // Промокод
 const promoMines = 'MINESPROMO22'; // Промокод

 
 const MainText = (ctx) => {
  const userId = ctx.from.id;

  const imagePath = path.join(__dirname, 'images', 'main_menu.jpg'); // Путь к изображению
  
  // Отправляем изображение и текст с кнопками
  ctx.replyWithPhoto({ source: imagePath })
    .then(() => {
      return ctx.replyWithHTML(
          '🎉 <b>Добро пожаловать в</b> 🔸<b>ABUZ BOT</b>🔸!\n\n' +
          '🎯 Ваша цель: забрать выигрыш <b>по сигналам</b> 🚀\n\n' +
          '🤖 Наш бот работает на базе нейросети <b>ChatGPT-4</b> и способен предсказывать сигналы с точностью до <b>93%</b>!\n\n' +
          '❗️ <i>Внимание:</i> бот корректно работает <b>только</b> с аккаунтами <b>1win</b>, зарегистрированными через раздел <b>"Регистрация"</b> в боте.\n\n' +
          '✅ <b>Что делать дальше?</b>\n' +
          '1. Перейдите в раздел <b>Регистрация</b>.\n' +
          '2. Ознакомьтесь с разделом <b>Инструкция</b> и начните играть!',
        Markup.inlineKeyboard([
          [
            Markup.button.callback('✈️ Jet', 'jet'),
            Markup.button.callback('💣 Mines', 'mines'),
          ]
        ])
      );
    })
    .catch((err) => {
      console.error('Ошибка при отправке изображения:', err);
      ctx.reply('Произошла ошибка при отправке изображения.');
    });
}
    
  

  const Instruction1 = (ctx) => {
    const imagePath = path.join(__dirname, 'images', 'jetTg.jpg'); 
    
    // Отправляем изображение и текст с кнопками
    ctx.replyWithPhoto({ source: imagePath })
    .then(() => {
        return ctx.replyWithHTML(
            'Бот основан и обучен на кластере нейросети 🖥 Chatgpt4.️\n\n' +
            'Для тренировки бота было сыграно 🎰10.000+ игр.)\n\n' +
            'Для получения максимального профита следуйте следующей инструкции:\n\n' +
            '🟢 1. Пройти регистрацию в букмекерской конторе1WIN (CLICK)<b> LuckyJet</b>. Если не открывается — заходим с включенным VPN (Швеция). В Play Market/App Store полно бесплатных сервисов, например: Vpnify, Planet VPN, Hotspot VPN и так далее!\n\n' +
            `🟢 2. Пополнить баланс своего аккаунта, используя промокод <b> ${promoJet} </b>, который даст +500% к депозиту.\n\n` +
            '🟢 3. Перейти в раздел 1win games и выбрать игру 🚀 \'LuckyJet\'.\n\n' +
            '🟢 4. Запросить сигнал в боте и ставить по сигналам из бота.\n\n' +
            '🟢 5. При неудачном сигнале советуем удвоить ставку, чтобы полностью перекрыть потерю при следующем сигнале.\n\n' + 
            '🟢 6. После выполнения данных шагов нажмите кнопку “выдать сигнал”\n\n',
            Markup.inlineKeyboard([
              
                   [ Markup.button.url('📱 Регистрация', urlJet)],
                   [ Markup.button.callback('🔙 Назад', 'jet')],
                
            ]),
            {
                disable_web_page_preview: true // Отключает предпросмотр ссылки
            }
        );
      })
      .catch((err) => {
        console.error('Ошибка при отправке изображения:', err);
        ctx.reply('Произошла ошибка при отправке изображения.');
      });
};
  const Instruction2 = (ctx) => {
    const imagePath = path.join(__dirname, 'images', 'intro_mines.jpg'); 
    
    // Отправляем изображение и текст с кнопками
    ctx.replyWithPhoto({ source: imagePath })
    .then(() => {
        return ctx.replyWithHTML(
            'Бот основан и обучен на кластере нейросети 🖥 Chatgpt4.️\n\n' +
            'Для тренировки бота было сыграно 🎰10.000+ игр.)\n\n' +
            'Для получения максимального профита следуйте следующей инструкции:\n\n' +
            '🟢 1. Пройти регистрацию в букмекерской конторе 1WIN Если не открывается - заходим с включенным VPN (Швеция). В Play Market/App Store полно бесплатных сервисов, например: Vpnify, Planet VPN, Hotspot VPN и так далее!\n\n' +
            `🟢 2. Пополнить баланс своего аккаунта используя промокод <b> ${promoMines} </b>, который даст +500% к депозиту.\n\n` +
            `🟢 3. Перейти в раздел 1win games и выбрать игру 🚀'Mines'.\n\n` +
            '🟢 4. Запросить сигнал в боте и ставить по сигналам из бота.\n\n' +
            '🟢 5. При неудачном сигнале советуем удвоить ставку что бы полностью перекрыть потерю при следующем сигнале.\n\n' + 
            `🟢 6. После выполнения данных шагов нажимайте на кнопку “выдать сигнал”\n\n`,
            Markup.inlineKeyboard([
              
                    [Markup.button.url('📱 Регистрация', urlMines)],
                    [Markup.button.callback('🔙 Назад', 'jet')],
                
            ])
        );
      })
      .catch((err) => {
        console.error('Ошибка при отправке изображения:', err);
        ctx.reply('Произошла ошибка при отправке изображения.');
      });
  };

  // const urlBot=(ctx)=>{
  //   bot.on('text', (ctx) => {
  //    const pathUrlBot = path.join(__dirname, 'url.txt');
  //     const urlMessage = ctx.message.text; // Получаем текст сообщения
  //     const urlBot = urlMessage.trim(); // Убираем пробелы
  //   }
  //   )}
  

module.exports =  {MainText, Instruction1,Instruction2,urlJet, urlMines, promoJet, promoMines}