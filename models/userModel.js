const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { boolean } = require("mathjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Tên không được trống"],
    },
    email: {
      type: String,
      require: [true, "Email không được trống"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Email không hợp lệ"],
    },
    password: {
      type: String,
      require: [true, "Mật khẩu không được trống"],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      require: [true, "Hãy xác nhận mật khẩu"],
      minlength: 6,
      validate: {
        validator: function (e) {
          return e === this.password;
        },
        message: "Không trùng khớp với mật khẩu",
      },
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "moderator", "admin"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    aboutMe: String,
    contactLink: String,
    phoneNumber: String,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    confirmationCode: {
      type: String,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (inputPassword, password) {
  return await bcrypt.compare(inputPassword, password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(3).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
