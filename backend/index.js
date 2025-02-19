import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import DBConnect from "./src/config/DBConnect.js";
import authRoutes from "./src/routes/auth/index.js";
import TopicRoutes from "./src/routes/admin/TopicRoutes.js";
import PostRoutes from "./src/routes/admin/PostRoutes.js";
import path from "path";
import uploadFile from "./src/routes/uploadFile.js";

// #region server
dotenv.config();
const __dirname = path.resolve();
const port = parseInt(process.env.PORT);
const app = express();
// #endregion server

// #region middlewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));
app.use("", (req, res, next) => {
  console.log("\nRequest");
  console.log({
    method: req.method.toUpperCase(),
    url: req.url,
    query: req.query,
    params: req.params,
    body: req.body,
  });
  next();
});
// #endregion routes

// #region routes
// upload file
app.use("/api/upload-file", uploadFile);
// auth routes
app.use("/api/auth", authRoutes);
// admin routes
app.use("/api/admin/topics", TopicRoutes);
app.use("/api/admin/posts", PostRoutes);
// #endregion routes

app.listen(port, async function () {
  await DBConnect();
  console.log(`Server is running on port ${port}`);
});
