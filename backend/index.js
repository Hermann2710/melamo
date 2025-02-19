import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import DBConnect from "./src/config/DBConnect.js";
import authRoutes from "./src/routes/auth/index.js";
import TopicRoutes from "./src/routes/admin/TopicRoutes.js";
import PostRoutes from "./src/routes/admin/PostRoutes.js";

dotenv.config();

const port = parseInt(process.env.PORT);
const app = express();

// middlewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

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

// routes
app.use("/api/auth", authRoutes);

// admi routes
app.use("/api/admin/topics", TopicRoutes);
app.use("/api/admin/posts", PostRoutes);

app.listen(port, async function () {
  await DBConnect();
  console.log(`Server is running on port ${port}`);
});
