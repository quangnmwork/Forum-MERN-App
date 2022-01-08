const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Email = require("./../utils/email");
const crypto = require("crypto");

const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = async (user, statusCode, req, res) => {
  const token = createToken(user._id);
  console.log("token: ", token);
  // res.cookie("jwt", token, {
  //   expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  //   httpOnly: false,
  //   secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  // });
  user.password = undefined;
  console.log(user.email, user._id);

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

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return next(new AppError("Nhập đầy đủ email và password"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Tài khoản hoặc mật khẩu không đúng", 401));
  }

  sendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError("Phiên của bạn đã hết hạn, vui lòng đăng nhập lại", 401));
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("Tài khoản không còn tồn tại", 401));
  }
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("Phiên của bạn đã hết hạn, vui lòng đăng nhập lại", 401));
  }
  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("403 Forbidden", 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1 get user by email
  const user = await User.findOne({ email: req.body.email });
  // check if user exist
  if (!user) {
    return next(new AppError("Email không hợp lệ", 404));
  }
  // generate token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // send email for user
  try {
    await new Email(user, resetToken).sendMail();
    res.status(200).json({
      status: "success",
      message: "Vui lòng check email của bạn",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("Có lỗi xảy ra . Vui lòng thử lại"), 500);
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash("sha256").update(req.body.resetToken).digest("hex");
  // console.log(req.body.resetToken);
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Mã của bạn không tồn tại", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  sendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  console.log(user);
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Mật khẩu hiện tại của bạn nhập không đúng", 401));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  sendToken(user, 200, req, res);
});
exports.logout = (req, res) => {
  req.headers.authorization = "";
  res.status(200).json({ status: "success" });
};
