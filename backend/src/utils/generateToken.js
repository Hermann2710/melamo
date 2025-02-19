import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export default function generateToken(user, res) {
  try {
    const token = jwt.sign({ user: user }, SECRET_KEY, { expiresIn: "7d" });
    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      httpOnly: true,
    });
  } catch (error) {
    console.log("Error generating token", error);
    throw new Error(error.message);
  }
}
