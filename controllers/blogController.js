const Blog = require("../models/blogModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const AppError = require("../utils/appError");
const filterObj = (obj, ...otherFields) => {
  const resObj = {};
  Object.keys(obj).forEach(objKey => {
    if (otherFields.includes(objKey)) resObj[objKey] = obj[objKey];
  });
  return resObj;
};

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const data = await Blog.find({});
  res.status(200).json({
    status: "success",
    data: data,
  });
});
exports.uploadBlogPhoto = upload.single("thumbnail");

exports.updateBlog = catchAsync(async (req, res, next) => {
  // Filter object want to update
  const filteredBody = filterObj(req.body, "content", "releaseDate", "category", "title");
  if (req.file) {
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        eager: [{ width: 500, height: 500, crop: "pad" }],
      },
      function (error, result) {
        // console.log(result, error);
      }
    );
    filteredBody.thumbnail = result.secure_url;
  }

  // update blog document

  const updateBlog = await Blog.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, filteredBody, {
    new: true,
    runValidators: true,
  });
  if (!updateBlog) {
    return next(new AppError("Không được chỉnh sửa post không phải của bạn"), 404);
  }
  res.status(200).json({
    status: "success",
    data: {
      blog: updateBlog,
    },
  });
});
exports.getBlog = factory.getOne(Blog);

exports.createBlog = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "content", "category", "title");
  filteredBody.user = req.user.id;
  if (req.file) {
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        eager: [{ width: 500, height: 500, crop: "pad" }],
      },
      function (error, result) {
        // console.log(result, error);
      }
    );
    filteredBody.thumbnail = result.secure_url;
  }

  // create blog
  const newBlog = await Blog.create(filteredBody);

  res.status(200).json({
    status: "success",
    data: {
      blog: newBlog,
    },
  });
});
exports.deleteBlog = factory.deleteOne(Blog);
