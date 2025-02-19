import express from "express";
import TopicController from "../../controllers/admin/TopicController.js";

const TopicRoutes = express.Router();

TopicRoutes.get("", TopicController.fetchTopics);

TopicRoutes.post("", TopicController.createTopic);
TopicRoutes.put("/:id", TopicController.editTopic);
TopicRoutes.delete("/:id", TopicController.deleteTopic);

export default TopicRoutes;
