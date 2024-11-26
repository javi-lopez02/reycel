import { Telegraf } from "telegraf";

const bot = new Telegraf("7824510445:AAF8C2hIxuJY6iDPfyBs2YySCLiMCy4hwSA");

bot.start((ctx) => {
  ctx.reply("HOLA REYCEL, ESPEREMOS A QUE NOS TRANSFIERAN...");
  const chatId = ctx.chat.id;
  ctx.reply(`Tu chat ID es: ${chatId}`);
});

bot.action("btn_1", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Confirmado");
});

bot.action("btn_2", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Denegado");
});

bot.launch();
