import { Router } from "express";
import {authMiddleware} from '../Middlewares/middlewareAdmin'
import {getSedes, getSedeId, createSede, updateSede, deleteSede} from '../Controllers/sedes.controller'
const router = Router();

router.get("/sedes", getSedes );

router.get("/sedes/:id", getSedeId );

router.post("/products/order", authMiddleware, createSede)

router.put("/products/order", authMiddleware, updateSede)

router.delete("/products/order", authMiddleware, deleteSede)


export default router;