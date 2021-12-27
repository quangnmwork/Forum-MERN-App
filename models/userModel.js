const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email không được trống'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email không hợp lệ'],
    },
    name: {
        type: String,
        require: [true, 'Tên không được trống'],
    },
    password: {
        type: String,
        require: [true, 'Mật khẩu không được trống'],
        minlength: 6,
        select: false
    },
    passwordConfirm: {
        type: String,
        require: [true, 'Hãy xác nhận mật khẩu'],
        minlength: 6,
        validate: {
            validator: function (e) {
                return e === this.password
            },
            message: 'Không trùng khớp với mật khẩu'
        },
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'moderator', 'admin'],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});
const User = mongoose.model('User',userSchema);
module.exports = User;