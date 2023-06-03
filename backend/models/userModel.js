import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

/* 
  ---------------------
  Schema Middleware
  ---------------------
*/

//Pre
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next;
});

/* 
---------------------
Schema Method
---------------------
*/

//Generating JWT Token
userSchema.method("generateToken", function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
});

//Comparing Password
userSchema.method("comparePassword", async function (password) {
  return await bcrypt.compare(password, this.password);
});

//Generating Reset Password Token
userSchema.method("getResetPasswordToken", async function () {
  const resetToken = crypto.randomBytes(16).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
});

/* 
  ---------------------
  Model
  ---------------------
*/
const User = mongoose.model("user", userSchema);

export default User;
