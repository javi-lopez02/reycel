import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import path from "path";
import auth from "./Routes/auth.routes";
import product from "./Routes/product.routes";
import rating from "./Routes/rating.routes";
import comment from "./Routes/comment.routes";
import order from "./Routes/order.routes";
import bots from "./Routes/bot.routes";
<<<<<<< HEAD
import { Markup, Telegraf } from "telegraf";

const bot = new Telegraf("7824510445:AAF8C2hIxuJY6iDPfyBs2YySCLiMCy4hwSA");

dotenv.config();

const initBot = () => {
  bot.start((ctx) => {
    ctx.reply("HOLA REYCEL, ESPEREMOS A QUE NOS TRANSFIERAN...");
  });

  bot.action("btn_1", (ctx) => {
    ctx.answerCbQuery();
    ctx.reply("Confirmado");
    // res.status(200).send({ success: true, message: "Confirmado" });
  });

  bot.action("btn_2", (ctx) => {
    ctx.answerCbQuery();
    ctx.reply("Denegado");
    // res.status(200).send({ success: true, message: "Denegado" });
  });

  bot.launch();
};

=======
import { Telegraf } from "telegraf";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(`${TOKEN}`);
>>>>>>> origin/main
const app = express();
const port = 4000;

app.use(
  cors({
    origin: [
      "http://localhost:4173",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:8000",
      "http://192.168.227.249:8000",

    ],
    credentials: true,
  })
);

initBot();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api", product);
app.use("/api", rating);
app.use("/api", comment);
app.use("/api", order);
app.use("/api", bots);

app.use("/public", express.static(path.join(__dirname, "/upload")));

export const initBot = () => {
  bot.start((ctx) => {
    ctx.reply("HOLA REYCEL, ESPEREMOS A QUE NOS TRANSFIERAN...");
    ctx.reply(ctx.chat.id.toString())
  });

  bot.action("btn_1", (ctx) => {
    ctx.answerCbQuery();
    ctx.reply("Confirmado");
    console.log("Confirmado")
    //res.status(200).send({ success: true, message: "Confirmado" });
  });

  bot.action("btn_2", (ctx) => {
    ctx.answerCbQuery();
    ctx.reply("Denegado");
    console.log("Denegado")
    //res.status(200).send({ success: true, message: "Denegado" });
  });

  bot.launch();
};

initBot()

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
