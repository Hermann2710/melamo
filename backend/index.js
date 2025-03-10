import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import DBConnect from "./src/config/DBConnect.js";
import authRoutes from "./src/routes/auth/index.js";
import postRoutes from "./src/routes/posts/index.js";
import usersRoutes from "./src/routes/users/index.js";
import uploadFile from "./src/routes/uploadFile.js";
import commentRoutes from "./src/routes/comments/index.js";
import messagesRoutes from "./src/routes/messages/index.js";
import { app, server } from "./src/socket/index.js";

// ENV VARS
dotenv.config();
const port = process.env.PORT;
const __dirname = path.resolve();

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

// Routes
app.use("/api/upload-image", uploadFile);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messagesRoutes);

// Listening on server
server.listen(port, async function () {
  await DBConnect();
  console.log("Listening on port " + port);
});
