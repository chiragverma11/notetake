import validator from "validator";
import crypto from "crypto";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import sendCookie from "../utils/sendCookie.js";
import sendEmail from "../utils/sendEmail.js";
import {
  sendForgotPasswordEmail,
  sendResetPasswordEmail,
} from "../utils/emails/emailTemplates.js";

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
    return next(new ErrorHandler("Email Already Exists", 403));
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

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Password", 401));
  }
  sendCookie(user, 200, res);
});

//Logout Controller
const logoutUser = catchAsyncError(async (req, res, next) => {
  //Send Cookie According to Node Env
  process.env.NODE_ENV !== "PRODUCTION"
    ? res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
    : res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "None",
        secure: true,
        domain: "notetake-app.netlify.app",
      });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//LoadUser Controller
const loadUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne(req.user._id);

  res.status(200).json({
    success: true,
    userDetails: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

//Forgot Password Controller
const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return next(new ErrorHandler("User doesn't exist", 401));

  //Generating Reset Password Token
  const resetToken = await user.getResetPasswordToken();

  //Saving Token to Database
  await user.save();

  //Reset Password Url
  const resetPasswordUrl =
    process.env.NODE_ENV !== "PRODUCTION"
      ? `${req.protocol}://${req.hostname}:${process.env.FRONTEND_PORT}/reset-password/${resetToken}`
      : `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  //Reset Password Url for Mobile User (Just for developement)
  const resetPasswordUrlM =
    process.env.NODE_ENV !== "PRODUCTION"
      ? `${req.protocol}://192.168.1.6:${process.env.FRONTEND_PORT}/reset-password/${resetToken}`
      : null;

  // console.log(resetPasswordUrl); //Just to get Reset Url directly from Console

  //Sending Forgot Password? Email
  process.env.NODE_ENV !== "PRODUCTION"
    ? sendForgotPasswordEmail(user, resetPasswordUrl, resetPasswordUrlM)
    : sendForgotPasswordEmail(user, resetPasswordUrl);

  res.status(200).json({
    success: true,
    message: "Forgot Password Email Sent",
  });
});

//Reset Password Controller
const resetPassword = catchAsyncError(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  //Hashing Token received in Params
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //Finding Hashed resetToken the User Database with Expiry time left
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password are not same", 406)
    );
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  //Saving Token to Database
  await user.save();

  //Sending Confirmation for Password Changed/Reset
  sendResetPasswordEmail(user);

  res.status(200).json({
    success: true,
    message: "Password Reset Successful",
  });
});

export {
  signupUser,
  loginUser,
  logoutUser,
  loadUser,
  forgotPassword,
  resetPassword,
};
