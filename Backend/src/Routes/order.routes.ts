import { Router } from "express";
import { authMiddleware as authAdmin } from "../Middlewares/middlewareAdmin";
import { authMiddleware } from "../Middlewares/middlewares";
import {
  addOrderItem,
  addOrderItemAdmin,
  confirmOrderAdmin,
  deleteOrderItem,
  deleteOrderItemAdmin,
  getOrderAdmin,
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



router.get("/order", authAdmin, getOrderAdmin);

router.get("/order/items/:id", authAdmin, getOrderItemsAdmin);

router.post("/order", authAdmin, addOrderItemAdmin)

router.put("/order", authAdmin, updateOrderItemAdmin);

router.delete("/order", authAdmin, deleteOrderItemAdmin);

router.post("/order/confirm", authAdmin, confirmOrderAdmin);


export default router;
