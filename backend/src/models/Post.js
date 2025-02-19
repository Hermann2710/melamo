import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "The post title is required"],
      unique: [true, "The post title is unique"],
    },
    slug: {
      type: String,
      required: [true, "The post slug is required"],
      unique: [true, "The post slug is unique"],
    },
    description: String,
    postImage: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The author is required"],
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: [true, "The topic is required"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);

export default Post;
