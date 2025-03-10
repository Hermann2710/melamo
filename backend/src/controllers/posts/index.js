import Post from "../../models/Post.js";
import User from "../../models/User.js";
import Comment from "../../models/Comment.js";

export default class PostController {
  static async fetchPosts(req, res) {
    try {
      let query = {};
      if (req.query.author) {
        query.author = {
          $regex: res.query.author,
          $options: "i",
        };
      }
      const posts = await Post.find(query).populate(["author"]);
      return res.json({
        success: true,
        posts: posts,
      });
    } catch (error) {
      console.log(`Error fetching posts: ${error}`);
      if (error instanceof Error) {
        return res.json({
          success: false,
          message: error.message,
        });
      } else {
        return res.json({
          success: false,
          message: error,
        });
      }
    }
  }

  static async createPost(req, res) {
    try {
      const { title, subtitle, slug, message, author } = req.body;
      const user = await User.findById(author);
      if (!user) {
        return res.json({
          success: false,
          message: "Author doesn't exist",
        });
      }
      const post = await Post.create({
        title: title,
        subtitle: subtitle,
        slug: slug,
        message: message,
        author: user._id,
      });
      return res.json({
        success: true,
        message: "Post created successfully",
        post: await post.populate(["author"]),
      });
    } catch (error) {
      console.log(`Error creating posts: ${error}`);
      if (error instanceof Error) {
        return res.json({
          success: false,
          message: error.message,
        });
      } else {
        return res.json({
          success: false,
          message: error,
        });
      }
    }
  }

  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, slug, subtitle, message, author } = req.body;
      let post = await Post.findById(id);
      if (!post) {
        return res.json({
          success: false,
          message: "Post does not exist",
        });
      } else {
        const user = await User.findById(author);
        if (!user) {
          return res.json({
            success: false,
            message: "Author doesn't exist",
          });
        } else {
          post.title = title || post.title;
          post.slug = slug || post.slug;
          post.subtitle = subtitle || post.subtitle;
          post.message = message || post.message;
          post.author = user._id;
          await post.save();

          return res.json({
            success: true,
            message: "Post updated successfully",
            post: await post.populate(["author"]),
          });
        }
      }
    } catch (error) {
      console.log(`Error updating posts: ${error}`);
      if (error instanceof Error) {
        return res.json({
          success: false,
          message: error.message,
        });
      } else {
        return res.json({
          success: false,
          message: error,
        });
      }
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        return res.json({
          success: false,
          message: "Post doesn't exist",
        });
      } else {
        const comments = await Comment.find({ post: post._id });
        comments.forEach(async (comment) => {
            await comment.deleteOne();
        });
        return res.json({
          success: true,
          message: "Post deleted successfully",
          post: post,
        });
      }
    } catch (error) {
      console.log(`Error deleting posts: ${error}`);
      if (error instanceof Error) {
        return res.json({
          success: false,
          message: error.message,
        });
      } else {
        return res.json({
          success: false,
          message: error,
        });
      }
    }
  }
}
