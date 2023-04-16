import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
});

//Comparing Password
userSchema.method("comparePassword", async function (password) {
  return await bcrypt.compare(password, this.password);
});

/* 
  ---------------------
  Model
  ---------------------
*/
const User = mongoose.model("user", userSchema);

export default User;
