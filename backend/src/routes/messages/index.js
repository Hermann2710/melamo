import express from "express";
import MessageController from "../../controllers/messages/index.js";

const messagesRoutes = express.Router();

messagesRoutes.get("/:senderId/:receiverId", MessageController.fetchMessages);

messagesRoutes.post("/", MessageController.addMessage);

messagesRoutes.put("/:messageId", MessageController.editMessage);

messagesRoutes.delete("/:messageId/:receiverId", MessageController.deleteMessage);

export default messagesRoutes;