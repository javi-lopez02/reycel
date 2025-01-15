import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewareAdmin";
import { functionName, generalData } from "../Controllers/analytics.controller";


const router = Router();

router.get("/", authMiddleware , generalData)

router.post("/payments", authMiddleware , functionName)


export default router;