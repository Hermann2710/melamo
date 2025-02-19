import Post from "../../models/Post.js";
import Topic from "../../models/Topic.js";

export default class TopicController {
  static async fetchTopics(req, res) {
    try {
      const topics = await Topic.find({});
      return res.json({
        success: true,
        topics: topics,
        totalTopics: topics.length,
      });
    } catch (error) {
      console.log("Error when fetching topics", error);
      if (error instanceof Error) {
        res.json({
          success: false,
          message: error.message,
        });
      } else {
        res.json({
          success: false,
          message: error,
        });
      }
    }
  }

  static async createTopic(req, res) {
    try {
      const { name, slug, description } = req.body;
      if (!name || !slug || !description)
        return res.json({
          success: false,
          message: "All fields are required",
        });
      const topic = new Topic({
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
      });
      await topic.save();

      return res.json({
        success: true,
        message: "Topic created successfully",
        topic: topic,
      });
    } catch (error) {
      console.log("Error when creating topic", error);
      if (error instanceof Error) {
        res.json({
          success: false,
          message: error.message,
        });
      } else {
        res.json({
          success: false,
          message: error,
        });
      }
    }
  }

  static async editTopic(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.json({
          success: false,
          message: "Please select a topic",
        });
      const { name, slug, description } = req.body;
      if (!name || !slug || !description)
        return res.json({
          success: false,
          message: "All fields are required",
        });
      const topic = await Topic.findById(id);
      if (!topic)
        return res.json({
          success: false,
          message: "Topic not found",
        });
      topic.name = name.trim();
      topic.description = description.trim();
      topic.slug = slug.trim();
      await topic.save();

      return res.json({
        success: true,
        message: "Topic updated successfully",
        topic: topic,
      });
    } catch (error) {
      console.log("Error when updating topic", error);
      if (error instanceof Error) {
        res.json({
          success: false,
          message: error.message,
        });
      } else {
        res.json({
          success: false,
          message: error,
        });
      }
    }
  }

  static async deleteTopic(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.json({
          success: false,
          message: "Please select a topic",
        });
      const topic = await Topic.findByIdAndDelete(id);
      if (!topic) {
        return res.json({
          success: false,
          message: "Topic not found",
        });
      } else {
        const posts = await Post.find({ topic: id });
        posts.map(async function (post) {
          await post.deleteOne();
        });
        return res.json({
          success: true,
          message: "Topic deleted successfully",
          topic: topic,
        });
      }
    } catch (error) {
      console.log("Error when deleting topic", error);
      if (error instanceof Error) {
        res.json({
          success: false,
          message: error.message,
        });
      } else {
        res.json({
          success: false,
          message: error,
        });
      }
    }
  }
}
