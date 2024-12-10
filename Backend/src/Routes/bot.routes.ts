import { Router } from "express";
import { initBot, message } from "../Controllers/bot.controller";

const router = Router();

router.get("/init", initBot);
router.get("/message", message)

export default router;
