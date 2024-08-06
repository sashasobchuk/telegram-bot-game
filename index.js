const TelegramBot = require('node-telegram-bot-api')

const TELEGRAM_TOKEN = '7226130877:AAE2aYbQGvl8f9l7RXRyCH3JmO92LscK-Y0'
const TELEGRAM_NAME = 'sasha_ulb_tv_bot'
const {againOptions, gamesOptions} = require('./options')

const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true})


const chats = []


const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Відгадай цифру від 1 до 10')
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber
  await bot.sendMessage(chatId, 'Відгадай ', gamesOptions)
}

function start() {
  bot.setMyCommands([
    {command: '/start', description: 'Почати користуватись ботом'},
    {command: '/info', description: 'Отримати інформацію про себе'},
    {command: '/game', description: 'Почати гру'},
  ])

  bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    if (text === '/start') {
      const htmlMessage = '<b>Бот стартував</b> ';
      return bot.sendMessage(chatId, htmlMessage, {parse_mode: 'HTML'});
    }
    if (text === '/info') {
      return  bot.sendMessage(chatId, `Ваше імя ${msg.from?.username} `)
    }
    if (text === '/game') {
      return startGame(chatId)
    }
    return bot.sendMessage(chatId, `Ви написали: ${text} не зрозуміла команда`)

  })

  bot.on('callback_query', async msg => {

    const data = msg.data
    const chatId = msg.message.chat.id

    if (data === '/again') {
      return startGame(chatId)
    }
    if (+data === +chats[chatId]) {
      //if my came
      const happySrc = `https://lh4.googleusercontent.com/proxy/2ie_e3DPGDpOuyVdxdEel9NsOWE62Ijv8o86YMd19tBiWRyHhVD-Yu0Kxv-3w8MnKVQhEbBn2EEdXe7RMl-9G-nWv2xy5ZRCo_ndsQmRSCE65ZZDCMov4cyYxcLCcoWla1w`
      await bot.sendPhoto(chatId, happySrc);
      return await bot.sendMessage(chatId, `Вітаю ви виграли,цифра: ${chats[chatId]}`, againOptions)
    } else {
      return await bot.sendMessage(chatId, `Ви не виграли, цифра була ${chats[chatId]}`, againOptions)
    }
  })

}

start()



