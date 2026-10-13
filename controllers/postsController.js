let posts = [
  {
    id: 1,
    title: "Getting Started with Express.js",
    content:
      "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
    author: "Alice Johnson",
    createdAt: new Date("2024-01-15").toISOString(),
    published: true,
  },
  {
    id: 2,
    title: "Understanding RESTful APIs",
    content:
      "REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to perform CRUD operations.",
    author: "Bob Smith",
    createdAt: new Date("2024-01-20").toISOString(),
    published: true,
  },
  {
    id: 3,
    title: "JavaScript Best Practices",
    content:
      "Writing clean, maintainable JavaScript code is essential for building robust applications. Here are some best practices to follow.",
    author: "Carol Davis",
    createdAt: new Date("2024-01-25").toISOString(),
    published: false,
  },
];

const getAllPosts = (req, res) => {
  res.status(200).json({
    posts,
    count: posts.length,
  });
};

const getPostById = (req, res, next) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error("Post doesn't exist");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ post });
};

const createPost = (req, res) => {
  const { title, content, author, published = false } = req.body;

  if (!title || title.length < 3) {
    return res.status(400).json({
      error: "The title must be at least 3 characters",
    });
  } else if (!content || content.length < 10) {
    return res.status(400).json({
      error: "The content must be at least 10 characters",
    });
  } else if (!author) {
    return res.status(400).json({
      error: "An author is required",
    });
  }

  const newPost = {
    id: Date.now(),
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
    published,
  };

  posts.push(newPost);

  return res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((post) => post.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(200).json({
      error: "Post not found",
    });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    ...req.body,
  };

  res.json({
    message: "Post updated successfully",
    post: posts[postIndex],
  });
};

const deletePost = (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((post) => post.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(200).json({
      error: "Post not found",
    });
  }

  const deletedPost = posts.splice(postIndex, 1)[0];

  res.json({
    message: "Post deleted successfully",
    post: deletedPost,
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
