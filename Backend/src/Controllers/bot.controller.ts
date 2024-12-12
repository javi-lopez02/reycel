import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { Markup, Telegraf } from "telegraf";
import { PrismaClient } from "@prisma/client";
import { BOT_ID } from "../conf";
const prisma = new PrismaClient();

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(`${TOKEN}`);

export const message = async (req: Request, res: Response) => {
<<<<<<< HEAD
  
=======
>>>>>>> origin/main
  try {

    const transactionNumber: number = req.body.transactionNumber
    const price: number = req.body.price
    const productCount = req.body.count
    

    await bot.telegram.sendMessage(
      BOT_ID,
      "hola",
      Markup.inlineKeyboard([
        Markup.button.callback("Confirmar", "btn_1"),
        Markup.button.callback("Denegar", "btn_2"),
      ])
    );
    res.status(200).send({ message: "Espere confirmacion de la Compra." });
  } catch (error) {
    console.error("Error al enviar mensaje a Telegram:", error);
    res
      .status(500)
      .send({ success: false, error: "Error al enviar mensaje a Telegram." });
  }
};
