const  TelegramBot  =require('node-telegram-bot-api')

const TELEGRAM_TOKEN = '7226130877:AAE2aYbQGvl8f9l7RXRyCH3JmO92LscK-Y0'
const TELEGRAM_NAME = 'sasha_ulbtv_bot'


const bot=  new TelegramBot(TELEGRAM_TOKEN,{polling:true})


const chats = []

const gamesOptions ={
  reply_markup:JSON.stringify({
    inline_keyboard:[
        [{text:'1',callback_data:'1'}, {text:'2',callback_data:'2'}, {text:'3',callback_data:'3'}],
        [{text:'4',callback_data:'4'}, {text:'5',callback_data:'5'}, {text:'6',callback_data:'6'}],
        [{text:'7',callback_data:'7'}, {text:'8',callback_data:'8'}, {text:'9',callback_data:'9'}],
        [{text:'0',callback_data:'0'}]
    ]
  })
}
const games2Options ={
  reply_markup:JSON.stringify({
    inline_keyboard:[
        [{text:'свята',callback_data:'game2_2',}, {text:'когось іншого',callback_data:'game2_1'}, {text:'себе',callback_data:'game2_3'}],
        [{text:'Сашу',callback_data:'game2_0'}],
    ]
  })
}
const againOptions2 ={
  reply_markup:JSON.stringify({
    inline_keyboard:[
      [{text:'Грати ще раз ',callback_data:'/again2'}]
    ]
  })
}


const againOptions ={
  reply_markup:JSON.stringify({
    inline_keyboard:[
        [{text:'Грати ще раз ',callback_data:'/again'}]
    ]
  })
}

const startGame = async (chatId)=>{
  await  bot.sendMessage(chatId,'Відгадай цифру від 1 до 10')
  const randomNumber = Math.floor(Math.random()*10)
  chats[chatId]=randomNumber
  await bot.sendMessage(chatId,'Відгадай ',gamesOptions)
}
const startGame2 = async (chatId)=>{
  await  bot.sendMessage(chatId,'Кого ти кохаєш')
  await bot.sendMessage(chatId,'Відгадай ',games2Options)
}

function start(){
  bot.setMyCommands([
    {command:'/start',description:'почати користуватись ботом'},
    {command:'/info',description:'отримати інформацію про себе'},
    {command:'/game',description:'почати гру'},
    {command:'/game2',description:'почати цікавішу гру'}
  ])

  bot.on('message',async (msg)=>{
    const text = msg.text
    const chatId = msg.chat.id
    if(text==='/start'){
      const htmlMessage = '<b>Бот стартував</b> ';
      bot.sendMessage(chatId, htmlMessage, { parse_mode: 'HTML' });
      return
    }
    if(text==='/info'){
      // debugger
      await bot.sendMessage(chatId,`Ваше імя ${msg.from?.username} `)
      return;
    }
    if(text==='/game'){
      return startGame(chatId)
    }
    if(text==='/game2'){
      return startGame2(chatId)
    }
      return  bot.sendMessage(chatId,`Ви написали: ${text} не зрозуміла команда`)

  })

  bot.on('callback_query',async msg=>{

    const data = msg.data
    const chatId = msg.message.chat.id
    // const happySrc = `https://lh4.googleusercontent.com/proxy/2ie_e3DPGDpOuyVdxdEel9NsOWE62Ijv8o86YMd19tBiWRyHhVD-Yu0Kxv-3w8MnKVQhEbBn2EEdXe7RMl-9G-nWv2xy5ZRCo_ndsQmRSCE65ZZDCMov4cyYxcLCcoWla1w`
    // await bot.sendPhoto(chatId, happySrc);

    if(data==='/again'){
      return startGame(chatId)
    }
    if(data==='/again2'){
      return startGame2(chatId)
    }
    if(data.includes('game2_')){
      //if my came 2
      const number =+data.split('game2_')[1]
      if(number=='0'){
        const happySrc = `https://lh4.googleusercontent.com/proxy/2ie_e3DPGDpOuyVdxdEel9NsOWE62Ijv8o86YMd19tBiWRyHhVD-Yu0Kxv-3w8MnKVQhEbBn2EEdXe7RMl-9G-nWv2xy5ZRCo_ndsQmRSCE65ZZDCMov4cyYxcLCcoWla1w`
        await bot.sendPhoto(chatId, happySrc);
        await bot.sendMessage(chatId,'Перемога, виграш, так і знав')
        return
      }
      if(number=='2'){return  bot.sendMessage(chatId, `Обіда на все життя`);}
      if(number=='1'){return bot.sendMessage(chatId, `Обіда`);}
      if(number=='3'){return  bot.sendMessage(chatId, `Самозакохана коза`);}
    }

    if(+data===+chats[chatId]){
      //if my came
      const happySrc = `https://lh4.googleusercontent.com/proxy/2ie_e3DPGDpOuyVdxdEel9NsOWE62Ijv8o86YMd19tBiWRyHhVD-Yu0Kxv-3w8MnKVQhEbBn2EEdXe7RMl-9G-nWv2xy5ZRCo_ndsQmRSCE65ZZDCMov4cyYxcLCcoWla1w`
      await bot.sendPhoto(chatId, happySrc);
      return await bot.sendMessage(chatId,`Вітаю ви виграли,цифра: ${chats[chatId]}`,againOptions)
    }else {
      return await bot.sendMessage(chatId,`Ви не виграли, цифра була ${chats[chatId]}`,againOptions)
    }
    return  bot.sendMessage(chatId,`Ви вибрали  цифру ${data}`)

  })

}

start()



