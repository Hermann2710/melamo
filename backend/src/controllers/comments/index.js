import Comment from "../../models/Comment.js";

export default class CommentController {
  static async addComment(req, res) {
    try {
      const { message, author, post } = req.body;
      if (!message) {
        return res.json({
          success: false,
          message: "The comment message is required",
        });
      } else {
        if (!author) {
          return res.json({
            success: false,
            message: "The author is required",
          });
        } else {
          if (!post) {
            return res.json({
              success: false,
              message: "The post is required",
            });
          } else {
            const comment = await Comment.create({
              message: message,
              author: author,
              post: post,
            });
            await comment.populate(["author", "post"]);
            return res.json({
              success: true,
              message: "Comment sent successfully",
              comment: comment,
            });
          }
        }
      }
    } catch (error) {
      console.log(`Error in comment controller ${error.message}`);
      res.json({
        success: false,
        message: error.message,
      });
    }
  }

  static async editComment(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.json({
          success: false,
          message: "You must select a comment",
        });
      } else {
        const { author, message } = req.body;
        const comment = await Comment.findById(id);
        if (!comment) {
          return res.json({
            success: false,
            message: "Comment doesn't exist",
          });
        } else {
          if (comment.author != author) {
            return res.json({
              success: false,
              message: "You are not the author",
            });
          } else {
            comment.message = message ? message : comment.message;
            await comment.save();
            await comment.populate(["author", "post"]);
            return res.json({
              success: true,
              message: "Comment updated successfully",
              comment: comment,
            });
          }
        }
      }
    } catch (error) {
      console.log(`Error in comment controller ${error.message}`);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteComment(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.json({
          success: false,
          message: "You must select a comment",
        });
      } else {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
          return res.json({
            success: false,
            message: "The post doesn't exist",
          });
        } else {
          await comment.populate(["author", "post"]);
          return res.json({
            success: false,
            message: "Comment deleted successfylly",
            comment: comment,
          });
        }
      }
    } catch (error) {
      console.log(`Error in comment controller ${error.message}`);
      res.json({
        success: false,
        message: error.message,
      });
    }
  }

  static async fetchComment(req, res) {
    try {
      const query = {};
      const { author, post } = req.body;
      if (author) {
        query["author"] = author.trim();
      }
      if (post) {
        query["post"] = post.trim();
      }
      const comments = await Comment.find(query).populate(["author", "post"]);
      return res.json({
        success: true,
        message: "Comments loaded successfully",
        comments: comments,
      });
    } catch (error) {
      console.log(`Error in comment controller ${error.message}`);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }
}
