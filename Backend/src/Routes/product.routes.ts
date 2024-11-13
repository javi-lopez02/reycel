import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import { getProduct } from "../Controllers/product.controller";

const router = Router();

router.get("/products", authMiddleware, getProduct);



export default router;
