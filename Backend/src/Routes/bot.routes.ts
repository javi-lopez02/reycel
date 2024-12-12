import { Router } from "express";
import { message } from "../Controllers/bot.controller";
import { authMiddleware } from "../Middlewares/middlewares";


const router = Router();

//router.get("/init", initBot);
router.get("/message", authMiddleware ,message)

export default router;
