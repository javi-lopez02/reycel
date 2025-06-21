import { Router } from "express";
import { authMiddleware as authAdmin } from "../Middlewares/middlewareAdmin";
import { authMiddleware } from "../Middlewares/middlewares";
import {
  addOrderItem,
  deleteOrderItem,
  getOrderAdmin,
  getOrderItems,
  getOrderItemsTable,
  updateOrderItem,
} from "../Controllers/order.controller";
const router = Router();

router.get("/products/order", authMiddleware, getOrderItems);

router.post("/products/order", authMiddleware, addOrderItem);

router.put("/products/order", authMiddleware, updateOrderItem);

router.delete("/products/order", authMiddleware, deleteOrderItem);



router.get("/order", authAdmin, getOrderAdmin);

router.get("/order/:id", authAdmin, getOrderItemsTable);


export default router;
