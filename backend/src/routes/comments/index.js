import express from "express";
import CommentController from "../../controllers/comments/index.js";

const commentRoutes = express.Router();

commentRoutes.post("/all", CommentController.fetchComment);
commentRoutes.post("/", CommentController.addComment);

commentRoutes.put("/:id", CommentController.editComment);
commentRoutes.delete("/:id", CommentController.deleteComment);

export default commentRoutes;
