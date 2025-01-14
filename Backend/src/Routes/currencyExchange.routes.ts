import { Router } from "express";
import {authMiddleware as authAdmin} from '../Middlewares/middlewareAdmin'
import { editCurrencyExchange, getCurrencyExchange } from "../Controllers/currencyExchange.controller";
const router = Router();

router.put("/editCurrency/:id", authAdmin, editCurrencyExchange);

router.get("/currency", authAdmin, getCurrencyExchange)


export default router;