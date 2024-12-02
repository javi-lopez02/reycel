import express from "express";
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
import { Markup, Telegraf } from "telegraf";

const bot = new Telegraf("7824510445:AAF8C2hIxuJY6iDPfyBs2YySCLiMCy4hwSA");

dotenv.config();

const app = express();
const port = 4000;

app.use(
  cors({
    origin: [
      "http://localhost:4173",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api", product);
app.use("/api", rating);
app.use("/api", comment);
app.use("/api", order);

app.use("/public", express.static(path.join(__dirname, "/upload")));

//Con esto mandamos el mensaje hola automaticamente cada vez que se accede a la ruta /send-message en el backend esta es una prueba que estuve haciendo....
app.use("/send-message", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
