const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Email = require("./../utils/email");

const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = async (user, statusCode, req, res) => {
  const token = createToken(user._id);
  console.log("token: ", token);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  user.password = undefined;
  await User.findByIdAndUpdate(user._id, { confirmationCode: token });
  console.log(user.email, user._id);
  const url = `${req.protocol}://${req.get("host")}/api/v1/users/confirm/${token}`;
  await new Email(user, url).sendMail();
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  await sendToken(newUser, 201, req, res);
});

exports.verifyUser = catchAsync(async (req, res, next) => {
  console.log(req.params.confirmationCode);
  const user = await User.findOne({ confirmationCode: req.params.confirmationCode });
  if (!user) {
    return next(new AppError("Không tìm thấy người dùng", 404));
  }
  user.isAuth = true;
  res.status(200).json({
    message: "Successs",
  });
});
