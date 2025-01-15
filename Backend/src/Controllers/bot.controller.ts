import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { Markup, Telegraf } from "telegraf";
import { PrismaClient } from "@prisma/client";
import { BOT_ID } from "../conf";
import { io, userSockets } from "../Libs/socketServer";

const prisma = new PrismaClient();

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(`${TOKEN}`);

export const initBot = () => {
  bot.start((ctx) => {
    ctx.reply("HOLA REYCEL, ESPEREMOS A QUE NOS TRANSFIERAN...");
    ctx.reply(ctx.chat.id.toString());
  });

  bot.on("callback_query", async (ctx) => {
    try {
      const callbackQuery = ctx.callbackQuery;

      if ("data" in callbackQuery) {
        const callbackData = callbackQuery.data;

        if (callbackData.startsWith("confirm_")) {
          const transactionID = callbackData.split("_")[1];

          await ctx.reply(`Transacción ${transactionID} confirmada.`);
          await ctx.answerCbQuery();

          const socketID = userSockets.get(transactionID);

          if (socketID) {
            io.to(socketID).emit("transactionStatus", {
              transactionID,
              status: "confirmed",
            });
            console.log(
              `Transacción ${transactionID} confirmada y enviada al usuario con socket ${socketID}`
            );
          } else {
            console.log(
              `No se encontró un usuario para la transacción ${transactionID}`
            );
          }
        } else if (callbackData.startsWith("deny_")) {
          const transactionID = callbackData.split("_")[1];

          await ctx.reply(`Transacción ${transactionID} denegada.`);
          await ctx.answerCbQuery();

          const socketID = userSockets.get(transactionID);

          if (socketID) {
            io.to(socketID).emit("transactionStatus", {
              transactionID,
              status: "denied",
            });
            console.log(
              `Transacción ${transactionID} denegada y enviada al usuario con socket ${socketID}`
            );
          } else {
            console.log(
              `No se encontró un usuario para la transacción ${transactionID}`
            );
          }
        }
      }
    } catch (error) {
      console.error("Error al procesar el callback:", error);
    }
  });

  bot.launch();
};

export const message = async (req: Request, res: Response) => {
  try {
    const transactionID: number = req.body.transactionID;
    const price: number = req.body.price;
    const productCount = req.body.productCount;
    const fastDelivery: boolean = req.body.fastDelivery;
    const address = req.body.address;
    const town: boolean = req.body.town;

    const message = `Se ha registrado una nueva transacción con los siguientes detalles:
    - **ID de Transacción:** ${transactionID}
    - **Cantidad de Productos:** ${productCount}
    - **Precio Total:** $${price.toFixed(2)}
    - **Entrega Rápida:** ${fastDelivery ? "Si" : "No"}
    - **Direccion:** ${address}
    - **Poblado:** ${town}
    
    Por favor, confirma o deniega esta transacción.`;

    await bot.telegram.sendMessage(
      BOT_ID,
      message,
      Markup.inlineKeyboard([
        Markup.button.callback("Confirmar", `confirm_${transactionID}`),
        Markup.button.callback("Denegar", `deny_${transactionID}`),
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
