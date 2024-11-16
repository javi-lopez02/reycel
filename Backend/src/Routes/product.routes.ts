import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import { getProduct, searchProduct } from "../Controllers/product.controller";

const router = Router();

router.get("/products", authMiddleware, getProduct);

router.get("/products/search", authMiddleware, searchProduct);


export default router;
