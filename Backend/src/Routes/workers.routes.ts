import { Router } from "express";
import { authMiddleware as authAdmin, authModeratorMiddleware } from "../Middlewares/middlewareAdmin";

import {
  createWorker,
  deleteWorker,
  editWorker,
  getWorkers,
  getWorkersById,
  getWorkersSedes,
} from "../Controllers/workers.controller";
const router = Router();

router.get("/worker", authAdmin, getWorkers);

router.get("/worker/:id", authAdmin, getWorkersById);

router.get("/workers", authAdmin, getWorkersSedes);

router.post("/worker", authAdmin, createWorker);

router.put("/worker/:id", authModeratorMiddleware, editWorker);

router.delete("/worker/:id", authAdmin, deleteWorker);

export default router;
