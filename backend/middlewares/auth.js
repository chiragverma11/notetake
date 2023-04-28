import jwt from "jsonwebtoken";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";

const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  //If token doesn't exist
  if (!token) {
    return next(new ErrorHandler("Please Login to access", 401));
  }

  //Verifying token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findOne({ _id: decoded.id });
  next();
});

export { isAuthenticated };
