const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post("/signup", authController.signup);
router.get("/confirm/:confirmationCode", authController.verifyUser);

// end authencation routes

// isAuth = true
// router.use(authController.checkVerification())

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Success",
  });
});

module.exports = router;
