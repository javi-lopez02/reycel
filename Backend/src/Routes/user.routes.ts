import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import { authMiddleware as authAdmin } from "../Middlewares/middlewareAdmin";
import {
  createUser,
  editUser,
  getUserID,
  getUserOrder,
  getUsers,
} from "../Controllers/user.controller";
const router = Router();

router.get("/user/order", authMiddleware, getUserOrder);

router.post("/user/order", authMiddleware, createUser);

router.put("/user/order", authMiddleware, editUser);

router.get("/users", authAdmin, getUsers);
router.get("/user/:id", authAdmin, getUserID);

export default router;
