import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import {
  notificationDelete,
  notificationDeleteAll,
  notificationRead,
  notificationReadAll,
} from "../Controllers/notifications.controller";

const router = Router();

router.post("/notification/all", authMiddleware, notificationReadAll);
router.post("/notification/:id", authMiddleware, notificationRead);
router.delete("/notification/deleteAll", authMiddleware, notificationDeleteAll);
router.delete("/notification/:id", authMiddleware, notificationDelete);

export default router;
