const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handleFactory");

const filterObj = (obj, ...otherFields) => {
  const resObj = {};
  Object.keys(obj).forEach(objKey => {
    if (otherFields.includes(objKey)) resObj[objKey] = obj[objKey];
  });
  return resObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const data = await User.find({});
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
});

exports.getUserId = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.getUserProfile = factory.getOne(User);

exports.updateUserProfile = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("Không phải để update mật khẩu", 400));
  }

  // Filter object want to update
  const filteredBody = filterObj(req.body, "name", "email");

  // update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.disableUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
