import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import { createComment } from "../Controllers/commnet.controller";
const router = Router();

router.post("/products/comment", authMiddleware, createComment);

export default router;
