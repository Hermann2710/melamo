import express from "express";
import PostController from "../../controllers/posts/index.js";

const postRoutes = express.Router();

postRoutes.get("", PostController.fetchPosts);
postRoutes.post("", PostController.createPost);
postRoutes.put("/:id", PostController.updatePost);
postRoutes.delete("/:id", PostController.deletePost);

export default postRoutes;