import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    tag: {
      type: String,
    },
  },
  { timestamps: true }
);

/* 
  ---------------------
  Model
  ---------------------
*/

const Note = mongoose.model("note", noteSchema);

export default Note;
