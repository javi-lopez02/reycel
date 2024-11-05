import { Router } from "express";
import {
  register,
  login,
  logout,
  confirmEmail,
  verifyToken
} from "../Controllers/auth.controller";
const router = Router();

router.post("/register", register);

router.get("/confirm/:token", confirmEmail);

router.get("/verify", verifyToken);

router.post("/login", login);

router.post("/logout", logout);


export default router;