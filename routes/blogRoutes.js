const express = require("express");
const blogController = require("../controllers/blogController");
const commentRouter = require("./../routes/commentRoutes");
const authController = require("../controllers/authController");
const router = express.Router();

router.use("/:blogId/comments", commentRouter);

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(authController.protect, blogController.uploadBlogPhoto, blogController.createBlog);
router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(authController.protect, blogController.uploadBlogPhoto, blogController.updateBlog)
  .delete(authController.protect, authController.restrictTo("admin"), blogController.deleteBlog);

module.exports = router;
