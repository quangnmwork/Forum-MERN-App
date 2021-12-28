const { promisify } = require('util');
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

const sendToken = async (user, statusCode, req, res, type) => {
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
  if (type == 'sign up') {
    const url = `${req.protocol}://${req.get("host")}/api/v1/users/confirm/${token}`;
    await new Email(user, url).sendMail();
  }
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

  await sendToken(newUser, 201, req, res, type = 'sign up');
});

exports.verifyUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ confirmationCode: req.params.confirmationCode });
  console.log(user);
  if (!user) {
    return next(new AppError("Không tìm thấy người dùng", 404));
  }
  await User.findOneAndUpdate(user.id, {isAuth:true});
  console.log(user);
  res.status(200).json({
    message: "Successs",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (!email || !password) {
    return next(new AppError("Nhập đầy đủ email và password"));
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Tài khoản hoặc mật khẩu không đúng"));
  }
  if (!user.isAuth) {
    return next(new AppError("Bạn chưa xác thực email", 401));
  }
  sendToken(user, 200, req, res, type = 'login');
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.header.authorization.startsWith('Bearer')) {
    token = req.header.split(' ')[1]
  }
  else if (req.cookies.jwt){
    token = req.cookies.jwt
  }
  if (!token) return new AppError("Phiên của bạn đã hết hạn, vui lòng đăng nhập lại", 401);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user){
    return next(new AppError("Tài khoản không còn tồn tại", 401));
  }
  if (user.changedPasswordAfter(decoded.iat)){
    return next(new AppError("Phiên của bạn đã hết hạn, vui lòng đăng nhập lại",401));
  }
  req.user = user;
  next();
});