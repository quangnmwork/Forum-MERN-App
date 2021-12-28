const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/confirm/:confirmationCode", authController.verifyUser);

// end authencation routes
router.use(authController.protect);

<<<<<<< HEAD
router.route('/').get(
  authController.protect,
  (req, res, next) => {
=======
router.get("/", (req, res, next) => {
>>>>>>> 4baf91a3a8f7a9ca4f8dd34c30dc6d147c13fc25
  res.status(200).json({
    status: "success",
    message: "Success",
  });
});

module.exports = router;
