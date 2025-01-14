import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import path from "path";
import { io, server, app } from "./Libs/socketServer";

import auth from "./Routes/auth.routes";
import product from "./Routes/product.routes";
import rating from "./Routes/rating.routes";
import comment from "./Routes/comment.routes";
import order from "./Routes/order.routes";
import bots from "./Routes/bot.routes";
import payment from "./Routes/payment.routes";
import sedes from "./Routes/sedes.routes";
import users from "./Routes/user.routes";
import analytics from "./Routes/analytics.routes";
import paymentMethod from "./Routes/paymentMethod.routes";
import currencyExchange from "./Routes/currencyExchange.routes";

import { initBot } from "./Controllers/bot.controller";

dotenv.config();
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
app.use("/api", payment);
app.use("/api", sedes);
app.use("/api", users);
app.use("/api", paymentMethod);
app.use("/api", currencyExchange);
app.use("/api/analytics", analytics);

app.use("/public", express.static(path.join(__dirname, "/Upload")));

//initBot();

io.on("connection", (socket: any) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});
