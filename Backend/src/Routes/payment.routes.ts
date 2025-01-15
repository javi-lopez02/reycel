import { Router } from "express";
import {authMiddleware as authAdmin} from '../Middlewares/middlewareAdmin'
import { authMiddleware } from "../Middlewares/middlewares";
import {addPayment, getPayments} from '../Controllers/payment.controller'
const router = Router();

router.post("/payment", authMiddleware, addPayment);

router.get("/payment", authAdmin, getPayments);


export default router;