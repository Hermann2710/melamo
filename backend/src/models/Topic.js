import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The topics's name is required"],
    unique: [true, "The topic's name must be unique"],
  },
  slug: {
    type: String,
    required: [true, "The topic's slug is required"],
    unique: [true, "The topic's slug must be unique"],
  },
  description: {
    type: String,
    required: [true, "The topic's description is required"],
  },
  totalPosts: { type: Number, default: 0 }
}, { timestamps: true });

const Topic = mongoose.models?.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
