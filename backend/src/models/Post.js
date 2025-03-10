import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "The title is required"],
      unique: [true, "The title is unique"],
    },
    subtitle: {
      type: String,
      required: [true, "The subtitle is required"],
    },
    slug: {
      type: String,
      required: [true, "The slug is required"],
      unique: [true, "The slug is unique"],
    },
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
