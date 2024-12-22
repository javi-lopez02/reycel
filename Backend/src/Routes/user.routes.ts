import { Router } from "express";
import { authMiddleware } from "../Middlewares/middlewares";
import { authMiddleware as authAdmin } from "../Middlewares/middlewareAdmin";
import {
  createUser,
  deleteUser,
  editUser,
  editUserAdmin,
  getUserID,
  getUserOrder,
  getUsers,
} from "../Controllers/user.controller";
const router = Router();

router.get("/user/order", authMiddleware, getUserOrder);

router.put("/user", authMiddleware, editUser);



router.get("/users", authAdmin, getUsers);

router.get("/user/:id", authAdmin, getUserID);

router.post("/user", authAdmin, createUser);

router.put("/user/:id", authAdmin, editUserAdmin);

router.delete("/user/:id", authAdmin, deleteUser);

export default router;
