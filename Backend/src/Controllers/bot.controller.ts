import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { Markup, Telegraf } from "telegraf";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(`${TOKEN}`);

export const initBot = (req: Request, res: Response) => {
  bot.start((ctx) => {
    ctx.reply("HOLA REYCEL, ESPEREMOS A QUE NOS TRANSFIERAN...");
  });

  bot.action("btn_1", (ctx) => {
    ctx.answerCbQuery();
    ctx.reply("Confirmado");
    res.status(200).send({ success: true, message: "Confirmado" });
  });

  bot.action("btn_2", (ctx) => {
    ctx.answerCbQuery();
    ctx.reply("Denegado");
    res.status(200).send({ success: true, message: "Denegado" });
  });

  bot.launch();
};

export const message = async (req: Request, res: Response) => {


  
  try {
    await bot.telegram.sendMessage(
      1415672973,
      "hola",
      Markup.inlineKeyboard([
        Markup.button.callback("Confirmar", "btn_1"),
        Markup.button.callback("Denegar", "btn_2"),
      ])
    );
    res.status(200).send({ success: true });
  } catch (error) {
    console.error("Error al enviar mensaje a Telegram:", error);
    res
      .status(500)
      .send({ success: false, error: "Error al enviar mensaje a Telegram." });
  }
};
