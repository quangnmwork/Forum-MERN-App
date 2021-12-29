const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/confirm/:confirmationCode", authController.verifyUser);

// changed,reset password route
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// end authencation routes
router.use(authController.protect);

router.get("/resendEmail", authController.resendEmail);

router.use(authController.checkAuth);

router.patch("/updatePassword", authController.updatePassword);
router.get("/getUser", userController.getUserId, userController.getUserProfile);
router.patch("/updateProfile", userController.updateUserProfile);

// for admin only

router.use(authController.restrictTo("admin"));

router.route("/:id").delete(userController.disableUser);

module.exports = router;
