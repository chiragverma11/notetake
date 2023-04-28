import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
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
router.route("/logout").post(logoutUser);

export default router;
