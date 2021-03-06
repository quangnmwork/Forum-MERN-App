const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/", userController.getAllUsers);

// changed,reset password route
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);

// end authencation routes

// see profile of user

router.get("/userProfile/:id", userController.getUserById);

//

router.use(authController.protect);

router.get("/:userId/follow", userController.followUser);
router.get("/:userId/unFollow", userController.unFollowUser);
router.patch("/updatePassword", authController.updatePassword);
router.get("/getUserProfile", userController.getUserId, userController.getUserProfile);

router.patch("/updateUserProfile", userController.uploadUserPhoto, userController.updateUserProfile);

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

// for admin only

router.use(authController.restrictTo("admin"));

router.route("/:id").delete(userController.disableUser);

module.exports = router;
