const express = require("express");

const authController = require("../controllers/authController");
const commentController = require("./../controllers/commentController");

const router = express.Router({ mergeParams: true });

router.get("/admin", commentController.getAllComments);

router
  .route("/")
  .get(commentController.getCommentByBlogId)
  .post(authController.protect, commentController.setBlogUserIds, commentController.createComment);

router
  .route("/:id")
  .get(commentController.getComment)
  .patch(
    authController.protect,
    commentController.setBlogUserIds,
    commentController.checkBlogBelongUser,
    commentController.updateComment
  )
  .delete(
    authController.protect,
    commentController.setBlogUserIds,
    commentController.checkBlogBelongUser,
    commentController.deleteComment
  );

//for admin only

router
  .route("/admin/:id")
  .delete(authController.protect, authController.restrictTo("admin"), commentController.deleteCommentAdmin);

module.exports = router;
