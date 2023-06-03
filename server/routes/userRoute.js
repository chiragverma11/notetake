import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  signupUser,
  loginUser,
  logoutUser,
  loadUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

/* 
  ---------------------
  Routes
  ---------------------
*/
router.get("/", (req, res) => {
  res.send("API is Running");
});

//Signup Route
router.route("/signup").post(signupUser);

//Login Route
router.route("/login").post(loginUser);

//Logout Route
router.route("/user").get(isAuthenticated, loadUser);

//Logout Route
router.route("/logout").post(logoutUser);

//Forgot Password Route
router.route("/forgot-password").post(forgotPassword);

//Reset Password Route
router.route("/reset-password/:token").patch(resetPassword);

export default router;
