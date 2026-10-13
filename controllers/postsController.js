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
  res.status(200).json(posts);
};

const getPostById = (req, res, next) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error("Post doesn't exist");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json(post);
};

module.exports = {
  getAllPosts,
  getPostById,
};