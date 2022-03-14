const Comment = require("./../models/commentModel");
const factory = require("./handleFactory");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.setBlogUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.blog) req.body.blog = req.params.blogId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.checkBlogBelongUser = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  // console.log(comment.user.id == req.user.id);
  if (req.user.id != comment.user.id) {
    return next(new AppError("Comment này không thuộc về bạn"), 401);
  } else return next();
});

exports.getCommentByBlogId = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ blog: req.params.blogId });
  res.status(201).json({
    status: "sucess",
    data: comments,
  });
});
exports.deleteCommentAdmin = catchAsync(async (req, res, next) => {
  const doc = await Comment.findByIdAndUpdate(req.params.id, { isDelete: true });

  if (!doc) {
    return next(new AppError("Không có blog ứng với id này", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({});
  res.status(200).json({
    status: "success",
    length: comments.length,
    data: comments,
  });
});
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
