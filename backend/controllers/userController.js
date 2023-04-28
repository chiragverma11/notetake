import validator from "validator";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import sendCookie from "../utils/sendCookie.js";

//SignUp Controller
const signupUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill out all required fields", 400));
  }

  let errors = [];
  //Email and Password Validation
  if (!validator.isEmail(email)) {
    errors.push("Please Enter valid Email Address");
    // return next(new ErrorHandler("Please Enter valid Email Address", 400));
  }
  if (!validator.isLength(password, { min: 3 })) {
    errors.push("Password must be atleast 3 characters");
    // return next(new ErrorHandler("Password must be atleast 3 characters", 400));
  }
  if (errors.length > 0) {
    return next(new ErrorHandler(errors, 400));
  }

  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("Email Already Exists", 401));
  }
  const newUser = await User.create({
    name,
    email,
    password,
  });
  sendCookie(newUser, 201, res);
});

//Login Controller
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill out all required fields", 400));
  }

  //Email and Password Validation
  if (!validator.isEmail(email)) {
    return next(new ErrorHandler("Please Enter valid Email Address", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User doesn't exist", 401));
  }

  const isMatch = user.comparePassword(user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Password", 401));
  }
  sendCookie(user, 200, res);
});

const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export { signupUser, loginUser, logoutUser };
