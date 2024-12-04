import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import {addOrderItem, deleteOrderItem, getOrderItems, updateOrderItem} from '../Controllers/order.controller'
const router = Router();

router.get("/products/order", authMiddleware, getOrderItems);

router.post("/products/order", authMiddleware, addOrderItem)

router.put("/products/order", authMiddleware, updateOrderItem)

router.delete("/products/order", authMiddleware, deleteOrderItem)


export default router;