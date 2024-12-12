import { Router } from "express";
import { message } from "../Controllers/bot.controller";
<<<<<<< HEAD

const router = Router();

router.get("/message", message)
=======
import { authMiddleware } from "../Middlewares/middlewares";


const router = Router();

//router.get("/init", initBot);
router.get("/message", authMiddleware ,message)
>>>>>>> origin/main

export default router;
