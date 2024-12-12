import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import { createUser, editUser, getUserOrder } from "../Controllers/user.controller";
const router = Router();

router.get("/user/order", authMiddleware, getUserOrder);

router.post("/user/order", authMiddleware, createUser);

router.put("/user/order", authMiddleware, editUser);

export default router;
