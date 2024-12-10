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
import bots from "./Routes/bot.routes";
import { Markup, Telegraf } from "telegraf";
import { initBot } from "./Controllers/bot.controller";

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
      "http://localhost:8000",
      "http://192.168.227.249:8000",

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
app.use("/api", bots);

app.use("/public", express.static(path.join(__dirname, "/upload")));

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
