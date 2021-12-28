const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllUsers =
    catchAsync(async (req, res, next) => {
        const data = await User.find({});
        res.status(200).json({
            status: 'success',
            data: {
                data,
            },
        });
    });