import express from "express";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express();

/* 
  ---------------------
  Routes
  ---------------------
*/

//Get All Notes Route
router.route("/notes").get(isAuthenticated, getNotes);

//Add Note Route
router.route("/note").post(isAuthenticated, addNote);

//Update & Delete Note Route
router
  .route("/note/:id")
  .patch(isAuthenticated, updateNote) //Update Note
  .delete(isAuthenticated, deleteNote); //Delete Note

export default router;
