import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    message: { type: String, required: [true, "The message is required"] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The author is required"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
