import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewareAdmin";
import {
  getSedes,
  getSedeId,
  createSede,
  updateSede,
  deleteSede,
  addLosses,
} from "../Controllers/sedes.controller";
const router = Router();

router.get("/sedes", getSedes);

router.get("/sedes/:id", getSedeId);

router.post("/sedes", authMiddleware, createSede);

router.put("/sedes/:id", authMiddleware, updateSede);

router.put("/losses/:id", authMiddleware, addLosses);

router.delete("/sedes/:id", authMiddleware, deleteSede);

export default router;
