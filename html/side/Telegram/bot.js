require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT1;
const axios = require("axios");
const exchangeRateApiKey = process.env.EXC;

const bot = new TelegramBot(token, { polling: true });

// RDP 테이블 (간단화된 버전, 수심 별 무감압 한계 시간과 표면 휴식 시간)
const RDP_TABLE = {
  10: { maxTime: 219, sitTime: 60 },
  12: { maxTime: 147, sitTime: 60 },
  14: { maxTime: 98, sitTime: 70 },
  16: { maxTime: 72, sitTime: 75 },
  18: { maxTime: 56, sitTime: 80 },
  20: { maxTime: 45, sitTime: 85 },
  22: { maxTime: 36, sitTime: 90 },
  25: { maxTime: 29, sitTime: 95 },
  30: { maxTime: 20, sitTime: 105 },
  35: { maxTime: 15, sitTime: 115 },
  40: { maxTime: 9, sitTime: 130 },
};

// 환율 명령어 처리
bot.onText(/(환율)/, async (msg) => {
  const chatId = msg.chat.id;

  const url = `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/USD`;

  try {
    const response = await axios.get(url);
    const rates = response.data.conversion_rates;
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 날짜를 포맷팅
    
    const message = `
    
     오늘의 환율 정보다 푸~
      날짜 : ${formattedDate}
      (기준 통화: USD)
    - USD/KRW: ${rates.KRW}
    - USD/EUR: ${rates.EUR}
    - USD/JPY: ${rates.JPY}
    - USD/CNY: ${rates.CNY}
    - USD/GBP: ${rates.GBP}
    `;
    
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "환율 정보를 가져오는데 실패했다 푸. 나중에 다시 물어봐줄래? 푸~");
  }
});

// 수심 입력 받기
bot.onText(/\/수심 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const depth = parseInt(match[1], 10);

  if (RDP_TABLE[depth]) {
    bot.sendMessage(chatId, `얘.. 수심 ${depth}m에 몇 분간 체류할 생각이냐 푸? /시간 [분] 형식으로 입력해줘! 푸~`);
    bot.once("message", (msg) => {
      const time = parseInt(msg.text.split(" ")[1], 10);
      calculateRDP(chatId, depth, time);
    });
  } else {
    bot.sendMessage(chatId, "해당 수심에 대한 데이터가 없다 푸! 그런건 해달놈들 한테나 물어봐라 파~!.");
  }
});

// RDP 계산 및 응답
function calculateRDP(chatId, depth, time) {
  const rdp = RDP_TABLE[depth];
  
  if (time > rdp.maxTime) {
    bot.sendMessage(chatId, `파! 너 헤카루 밥이되고싶냐 푸? 용궁으로 가기 싫으면 정신차리라구 파! (한계시간: ${rdp.maxTime}분)`);
  } else {
    const response = `
    내가 해달은 아니지만.. 알려주겠다 푸!

    수심 ${depth}m에서의 
    무감압 한계 시간: ${rdp.maxTime}분
    네가 머물 시간: ${time}분
    표면 휴식 시간: ${rdp.sitTime}분이다 파~
    
    가서 조개랑 산호 많이 잡아와라 푸~!
    `;
    bot.sendMessage(chatId, response);
  }
}

// 기타 명령어들
bot.onText(/(날짜)/, (msg, match) => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 날짜를 포맷팅
  const chatId = msg.chat.id;
  
  const resp = `오늘의 날짜는 ${formattedDate} 이다 푸~`;
  
  bot.sendMessage(chatId, resp);
});

bot.onText(/(안녕)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "반갑다 푸~"; 
  bot.sendMessage(chatId, resp);
});
bot.onText(/(가볼게)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "잘가라 푸~"; 
  bot.sendMessage(chatId, resp);
});
bot.onText(/(파푸야)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "왜 부르냐 푸~"; 
  bot.sendMessage(chatId, resp);
});
bot.onText(/(해달)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "음..? 감히 파푸앞에서 해달 녀석들 얘기를 하는거냐! 푸!"; 
  bot.sendMessage(chatId, resp);
});
bot.onText(/(생선)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "음..? 어디서 해달놈들이 풍기는 비린내가 나지 않냐 푸?~"; 
  bot.sendMessage(chatId, resp);
});
bot.onText(/(파푸탕탕이)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "호에엥ㅠ 나..날 먹을거냐 푸?...ㅠㅠㅠ"; 
  bot.sendMessage(chatId, resp);
});
bot.onText(/(푸슉)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "윽..어째서..나를 찌르다니.. 비릿내나는 해달놈들한테 붙은거냐 푸...(털썩)"; 
  bot.sendMessage(chatId, resp);
});
bot.onText(/(날씨)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "개발자가 게을러서 그런기능 없다 푸~ https://www.windy.com/  이거나 봐라 푸~  "; 
  bot.sendMessage(chatId, resp);
});
bot.onText(/(따라해)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match.input;
  bot.sendMessage(chatId, resp);
});
bot.onText(/(고마워)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = "엣헴~ 이런건 파푸한테 어려운게 아니다 푸! (우쭐) "; 
  bot.sendMessage(chatId, resp);
});

console.log("봇이 가동되었다 푸~");
