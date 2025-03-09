import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewareAdmin";
import { authMiddleware as middleware } from "../Middlewares/middlewares";
import {
  createPaymentMethod,
  deletePaymentMethod,
  getPaymentMethod,
  updatePaymentMethod,
} from "../Controllers/paymentMethod.controller";
const router = Router();

router.get("/paymentMethod", middleware, getPaymentMethod);

router.post("/paymentMethod", authMiddleware, createPaymentMethod);

router.put("/paymentMethod/:id", authMiddleware, updatePaymentMethod);

router.delete("/paymentMethod/:id", authMiddleware, deletePaymentMethod);

export default router;
