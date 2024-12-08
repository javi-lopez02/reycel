import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import { getUserOrder } from "../Controllers/user.controller";
const router = Router();

router.get("/user/order", authMiddleware, getUserOrder);

export default router;
