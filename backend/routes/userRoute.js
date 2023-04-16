import express from "express";
import { signupUser, loginUser } from "../controllers/userController.js";

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
router.post("/signup", signupUser);

//Login Route
router.post("/login", loginUser);

export default router;
