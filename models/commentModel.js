const mongoose = require("mongoose");
const Blog = require("./blogModel");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Comment không được trống"],
  },
  rating: {
    type: Number,
    required: [true, "Comment phải có đánh giá"],
  },
  releaseDate: {
    type: Date,
    default: Date.now(),
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Một comment phải thuộc về một người dùng"],
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: [true, "Một comment phải thuộc về một bài viết"],
  },
});

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name avatar",
  });
  next();
});

commentSchema.statics.calcAvgRatings = async function (blogId) {
  const stats = await this.aggregate([
    {
      $match: { blog: blogId },
    },
    {
      $group: {
        _id: "$blog",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Blog.findByIdAndUpdate(blogId, { ratingsQuantity: stats[0].nRating, ratingsAvg: stats[0].avgRating });
  } else {
    await Blog.findByIdAndUpdate(blogId, {
      ratingsQuantity: 0,
      ratingsAvg: 0,
    });
  }
};
commentSchema.post("save", function () {
  this.constructor.calcAvgRatings(this.blog);
});

commentSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  console.log("hello", this.r.blog);
  next();
});

commentSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAvgRatings(this.r.blog);
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
