import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import {addOrderItem, getOrderItems} from '../Controllers/order.controller'
const router = Router();

router.get("/products/order", authMiddleware, getOrderItems);

router.post("/products/order", authMiddleware, addOrderItem)

export default router;