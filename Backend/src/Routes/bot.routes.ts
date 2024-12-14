import { Router } from "express";
import { message } from "../Controllers/bot.controller";

const router = Router();

router.get("/message", message)

export default router;
