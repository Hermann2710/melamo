import { Router } from "express";
import {
  checkAuth,
  deleteProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateProfileAvatar,
  updateProfileDetails,
  updateProfilePassword,
} from "../../controllers/auth/index.js";

const authRoutes = Router();

authRoutes.get("/check-auth", checkAuth);

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logoutUser);

authRoutes.put("/profile/details/:id", updateProfileDetails);
authRoutes.patch("/profile/password/:id", updateProfilePassword);
authRoutes.patch("/profile/avatar/:id", updateProfileAvatar);

authRoutes.delete("/delete/:id", deleteProfile);

export default authRoutes;
