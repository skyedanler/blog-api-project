const express = require("express");

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mount routers
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Blog Post API",
    endpoints: {
      posts: "/api/posts",
      users: "/api/users",
      health: "/health",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    message: "Blog Post API is running",
  });
});

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  return next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
