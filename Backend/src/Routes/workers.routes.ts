import { Router } from "express";
import { authMiddleware as authAdmin } from "../Middlewares/middlewareAdmin";

import {
  createWorker,
  deleteWorker,
  editWorker,
  getWorkers,
  getWorkersSedes,
} from "../Controllers/workers.controller";
const router = Router();

router.get("/worker", authAdmin, getWorkers);

router.get("/workers", authAdmin, getWorkersSedes);

router.post("/worker", authAdmin, createWorker);

router.put("/worker/:id", authAdmin, editWorker);

router.delete("/worker/:id", authAdmin, deleteWorker);

export default router;
