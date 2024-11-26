import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import { ratingProductCreate } from "../Controllers/rating.controller";

const router = Router();

router.post("/products/rating/:id", authMiddleware, ratingProductCreate);

export default router;
