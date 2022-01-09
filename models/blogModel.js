const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: [true, "Nội dung không được trống"],
    },
    title: {
      type: String,
      require: [true, "Tiêu đề không được trống"],
    },
    releaseDate: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Một bài viết phải thuộc về một người dùng"],
    },
    isFeatured: {
      type: Boolean,
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail không được trống"],
    },
    ratingsAvg: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: "other",
      enum: ["technology", "exp", "other"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v -passwordChangedAt -email -role -contactLink -phoneNumber -followers -following ",
  });
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
