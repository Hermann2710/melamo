import express from "express";
import PostController from "../../controllers/admin/PostController.js";

const PostRoutes = express.Router();

PostRoutes.get("/", PostController.fetchPosts);

PostRoutes.post("/", PostController.createPost);
PostRoutes.put("/:id", PostController.updatePost);
PostRoutes.delete("/:id", PostController.deletePost);

export default PostRoutes;
