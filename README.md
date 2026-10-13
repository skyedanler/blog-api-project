# Blog Post API

A simple RESTful API built with Node.js and Express.js. This project allows users to create, view, update, and delete blog posts and users. Postman was used for testing endpoints.


### Blog Posts

<code>
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
</code>

### Users

<code>
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
</code>
