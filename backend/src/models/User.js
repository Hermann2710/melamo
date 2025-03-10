import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The username is required"],
    unique: [true, "The username is already in use"],
  },
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: [true, "The email is already in use"],
  },
  password: { type: String, required: [true, "The password is required"] },
  role: { type: String, default: "user", enum: ["admin", "user"] },
  avatar: String,
  followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  followings: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
