import { Router } from "express";
import { authMiddleware as authAdmin } from "../Middlewares/middlewareAdmin";
import { authMiddleware } from "../Middlewares/middlewares";
import {
  addOrderItem,
  addOrderItemAdmin,
  deleteOrderItem,
  deleteOrderItemAdmin,
  getOrder,
  getOrderItems,
  getOrderItemsAdmin,
  updateOrderItem,
  updateOrderItemAdmin,
} from "../Controllers/order.controller";
const router = Router();

router.get("/products/order", authMiddleware, getOrderItems);

router.post("/products/order", authMiddleware, addOrderItem);

router.put("/products/order", authMiddleware, updateOrderItem);

router.delete("/products/order", authMiddleware, deleteOrderItem);




router.get("/order", authAdmin, getOrder);

router.get("/order/items/:id", authAdmin, getOrderItemsAdmin);

router.post("/order", authAdmin, addOrderItemAdmin)

router.put("/order", authMiddleware, updateOrderItemAdmin);

router.delete("/order", authAdmin, deleteOrderItemAdmin);


export default router;
