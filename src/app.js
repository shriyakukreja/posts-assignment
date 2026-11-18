import express from "express";
import postRoutes from "./routes/post.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Posts API is running" });
});

app.use("/api/posts", postRoutes);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError" || err.type === "entity.parse.failed") {
    return res.status(400).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
});

export default app;