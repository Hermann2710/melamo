import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongodb_uri = process.env.MONGODB_URI;

export default async function DBConnect() {
  try {
    await mongoose.connect(mongodb_uri).then(() => {
      console.log("Connected to mongodb");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
