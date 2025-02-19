import { Router } from "express";
import {
  checkAuth,
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/index.js";

const authRoutes = Router();

authRoutes.get("/check-auth", checkAuth);

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logoutUser);

authRoutes.delete("/delete/:id", logoutUser);

export default authRoutes;
