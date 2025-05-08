import { Router } from "express";
import {
  register,
  login,
  logout,
  confirmEmail,
  verifyToken,
  resetPassword,
  confirmResetPassword
} from "../Controllers/auth.controller";
import {loginAdmin, verifyTokenAdmin} from '../Controllers/authAdmin.controller'
const router = Router();

router.post("/register", register);

router.get("/confirm/:token", confirmEmail);

router.get("/verify", verifyToken);

router.post("/login", login);

router.post("/logout", logout);


router.post("/forgot-password", resetPassword)

router.post("/reset-password/:token", confirmResetPassword)


router.post("/admin/login", loginAdmin )

router.get("/admin/verify", verifyTokenAdmin )

export default router;