let users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    createdAt: new Date("2024-01-10").toISOString(),
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "author",
    createdAt: new Date("2024-01-12").toISOString(),
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    role: "author",
    createdAt: new Date("2024-01-14").toISOString(),
  },
];

const getAllUsers = (req, res) => {
  res.status(200).json({ 
    users,
    count: users.length 
});
};

const getUserById = (req, res, next) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    const error = new Error("user doesn't exist");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ user });
};

const createUser = (req, res) => {
  const { name, email, role = "author" } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validRoles = ["admin", "author", "reader"];

  if (!name || name.length < 2) {
    return res.status(400).json({
      error: "The name must be at least 2 characters",
    });
  }

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      error: "Validation error",
      message: "Please provide a valid email address",
    });
  }

  if (!validRoles.includes(role.toLowerCase())) {
    return res.status(400).json({
      error: "Invalid role",
      message: `Role must be one of: ${validRoles.join(", ")}`,
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    role: role.toLowerCase(),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  return res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(200).json({
      error: "User not found",
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
  };

  res.json({
    message: "User updated successfully",
    user: users[userIndex],
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(200).json({
      error: "User not found",
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.json({
    message: "User deleted successfully",
    user: deletedUser,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
