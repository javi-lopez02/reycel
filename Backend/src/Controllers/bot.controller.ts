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

const confirmTransaction = async (userID: string, paymentID: number, socketID: string, transactionID: string) => {
  try {
    await prisma.payment.update({
      where: {
        id: paymentID,
      },
      data: {
        paymentStatus: "COMPLETED",
      },
    });

    const notification = await prisma.notification.create({
      data: {
        userId: userID,
        message: "Tu pago ha sido confirmado.",
        type: "PAYMENT_SUCCESS",
      },
    });

    //restar producto del inventario

    io.to(socketID).emit("transactionStatus", {
      transactionID,
      notification,
      status: "confirmed",
    });

    //enviar el email


  } catch (error) {
    console.error("Error al confirmar el pago: ", error);
    io.to(socketID).emit("transactionStatus", {
      transactionID,
      status: "error",
    });
  }
};

const deniedTransaction = async (userID: string, paymentID: number, socketID: string, transactionID: string) => {
  try {
    await prisma.payment.update({
      where: {
        id: paymentID,
      },
      data: {
        paymentStatus: "FAILED",
      },
    });

    const notification = await prisma.notification.create({
      data: {
        userId: userID,
        message: "Tu pago ha sido denegado.",
        type: "PAYMENT_FAILED",
      },
    });

    io.to(socketID).emit("transactionStatus", {
      transactionID,
      notification,
      status: "denied",
    });

  } catch (error) {
    console.error("Error al denegar el pago: ", error);
    io.to(socketID).emit("transactionStatus", {
      transactionID,
      status: "error",
    });
  }
}

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
          const userID = callbackData.split("_")[2];
          const paymentID = callbackData.split("_")[3];

          await ctx.reply(`Transacción ${transactionID} confirmada.`);
          await ctx.answerCbQuery();

          const socketID = userSockets.get(transactionID);

          if (socketID) {
            confirmTransaction(userID, parseInt(paymentID), socketID, transactionID);
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
          const userID = callbackData.split("_")[2];
          const paymentID = callbackData.split("_")[3];

          await ctx.reply(`Transacción ${transactionID} denegada.`);
          await ctx.answerCbQuery();

          const socketID = userSockets.get(transactionID);

          if (socketID) {
            deniedTransaction(userID, parseInt(paymentID), socketID, transactionID);
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
    const {
      transactionID,
      price,
      productCount,
      fastDelivery,
      address,
      town,
      userID,
      orderID,
      paymentMethodId,
    } = req.body;

    const message = `Se ha registrado una nueva transacción con los siguientes detalles:
    - ID de Transacción: ${transactionID}
    - Cantidad de Productos: ${productCount}
    - Precio Total: $${price.toFixed(2)}
    - Entrega Rápida: ${fastDelivery ? "Si" : "No"}
    - Direccion: ${address}
    - Poblado: ${town}
    
    Por favor, confirma o deniega esta transacción.`;

    await prisma.order.update({
      where: {
        id: orderID,
      },
      data: {
        pending: false,
      },
    });

    const order = await prisma.order.create({
      data: {
        userId: userID,
        pending: true,
      },
      select: {
        _count: true,
        totalAmount: true,
        id: true,
        orderItems: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            price: true,
            quantity: true,
            product: {
              include: {
                category: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const payment = await prisma.payment.create({
      data: {
        orderId: orderID,
        amount: price,
        transactionID,
        paymentMethodId,
        userId: userID,
      },
    });

    await bot.telegram.sendMessage(
      BOT_ID,
      message,
      Markup.inlineKeyboard([
        Markup.button.callback(
          "Confirmar",
          `confirm_${transactionID}_${userID}_${payment.id}`
        ),
        Markup.button.callback(
          "Denegar",
          `deny_${transactionID}_${userID}_${payment.id}`
        ),
      ])
    );
    res.status(200).send({order, message: "Su pago a sido realizado con exito espere a que se confirme."});
  } catch (error) {
    console.error("Error al enviar mensaje a Telegram:", error);
    res
      .status(500)
      .send({ success: false, error: "Error al enviar mensaje a Telegram." });
  }
};
