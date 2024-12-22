import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import {addPayment} from '../Controllers/payment.controller'
const router = Router();

router.post("/payment", authMiddleware, addPayment);

export default router;