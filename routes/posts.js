const { getAllPosts, getPostById } = require("../controllers/postsController");
const express = require("express");
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);

module.exports = router;
