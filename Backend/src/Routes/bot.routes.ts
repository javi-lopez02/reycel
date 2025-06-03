import { Router } from "express";
import { authMiddleware as authMiddlewareBot } from "../Middlewares/middlewareBot";
import {
  confirmTransaction,
  deniedTransaction,
  sendMessageBot,
  validateTransaction,
} from "../Controllers/bot.controller";
import { authMiddleware } from "../Middlewares/middlewares";

const router = Router();

//router.get("/init", initBot);
router.post("/transactions/confirm", authMiddlewareBot ,confirmTransaction);
router.post("/transactions/denied", authMiddlewareBot ,deniedTransaction);

router.post("/send_message_bot", authMiddleware ,sendMessageBot);

router.post("/validateTransaction", authMiddleware, validateTransaction);

export default router;
