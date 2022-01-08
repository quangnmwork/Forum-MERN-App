const mongoose = require("mongoose");
const validator = require("validator");
const { boolean } = require("mathjs");

const blogSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            require: [true, "Nội dung không được trống"],
        },
        releaseDate:{
            type: Date,
            default: Date.now()
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        isFeatured:{
            type: Boolean,
        },
        images:{
            type: String,
        },
        thumbnail: {
            type: String,
            required: [true, "Thumbnail không được trống"]
        },
        ratingAvg: {
            type: Number,
            default: 0
        },
        ratingsQuantity: {
            type: Number,
            default: 0
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

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
