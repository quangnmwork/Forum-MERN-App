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

router.patch("/updatePassword", authController.updatePassword);

// router.route("/").get(authController.protect, (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     message: "Success",
//   });
// });

module.exports = router;
