import express from "express";
import {
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../controllers/auth/index.js";

const usersRoutes = express.Router();

usersRoutes.get("", fetchUsers);
usersRoutes.put("/:id", updateUser);
usersRoutes.delete("/:id", deleteUser);

export default usersRoutes;
