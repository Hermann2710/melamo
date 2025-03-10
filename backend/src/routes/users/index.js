import express from "express";
import {
  deleteUser,
  fetchUsers,
  followUser,
  unFollowUser,
  updateUser,
} from "../../controllers/auth/index.js";

const usersRoutes = express.Router();

usersRoutes.get("", fetchUsers);

usersRoutes.post("/follow", followUser);
usersRoutes.post("/unfollow", unFollowUser);

usersRoutes.put("/:id", updateUser);
usersRoutes.delete("/:id", deleteUser);

export default usersRoutes;
