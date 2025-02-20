import Post from "../../models/Post.js";
import Topic from "../../models/Topic.js";
import User from "../../models/User.js";

export default class PostController {
  static async fetchPosts(req, res) {
    try {
      const { topic, author } = req.query;
      const query = {};
      if (topic) {
        query.topic = { $regex: topic.trim(), $options: "i" };
      }
      if (author) {
        query.author = { $regex: author.trim(), $options: "i" };
      }
      const posts = await Post.find(query).populate(["topic", "author"]);
      return res.json({
        success: true,
        posts: posts,
      });
    } catch (error) {
      console.log("Error when fetching posts", error);
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
  static async createPost(req, res) {
    try {
      const { title, slug, description, postImage, author, topic } = req.body;
      if (!description || !slug) {
        return res.json({
          success: false,
          message: "The post cannot be empty.",
        });
      } else {
        const t = await Topic.findById(topic);
        if (!t)
          return res.json({
            success: false,
            message: "Topic not found",
          });
        const a = await User.findById(author);
        if (!a)
          return res.json({
            success: false,
            message: "Author not found",
          });

        const post = new Post({
          title: title.trim(),
          slug: slug.trim(),
          description: description ? description.trim() : null,
          postImage: postImage ? postImage.trim() : null,
          author: author,
          topic: topic,
        });
        await post.save().populate(["topic", "author"]);
        // Update the topic total posts count
        console.log(t);
        t.totalPosts += 1;
        await t.save();

        return res.json({
          success: true,
          message: "Post created successfully",
          post: post,
        });
      }
    } catch (error) {
      console.log("Error when creating post", error);
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

  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, slug, description, postImage, topic } = req.body;
      if (!id) {
        return res.json({
          success: false,
          message: "Please select a post",
        });
      } else {
        const post = await Post.findById(id);
        if (!post) {
          return res.json({
            success: false,
            message: "Post not found",
          });
        } else {
          if (!description || postImage) {
            return res.json({
              success: false,
              message: "The post cannot be empty.",
            });
          } else {
            const t = await Topic.findById(topic);
            if (!t) {
              return res.json({
                success: false,
                message: "The topic does not exist.",
              });
            } else {
              post.title = title.trim();
              post.slug = slug.trim();
              post.description = description.trim();
              post.postImage = postImage.trim();
              post.topic = topic.trim();
              await post.save();
              post = await post.populate(["topic", "author"]);

              return res.json({
                success: true,
                message: "Post updated successfully",
                post: post,
              });
            }
          }
        }
      }
    } catch (error) {
      console.log("Error when updating post", error);
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

  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.json({
          success: true,
          message: "Please select a post",
        });
      const post = await Post.findById(id);
      if (!post) {
        return res.json({
          success: false,
          message: "No post found",
        });
      } else {
        const topic = await Topic.findById(post.topic);
        if (topic) {
          topic.totalPosts -= 1;
          await topic.save();
        }
        await post.deleteOne();
        return res.json({
          success: true,
          message: "Post deleted successfully",
          post: post,
        });
      }
    } catch (error) {
      console.log("Error when deleting post", error);
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
