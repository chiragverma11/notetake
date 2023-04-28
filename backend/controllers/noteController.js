import Note from "../models/noteModel.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

//get all Notes Controller
const getNotes = catchAsyncError(async (req, res, next) => {
  //Fetching Notes from Database
  const notes = await Note.find({ user: req.user._id });
  res.json({ success: true, notes });
});

//addNote Controller
const addNote = catchAsyncError(async (req, res, next) => {
  const { title, description, tag } = req.body;

  const newNote = await Note.create({
    user: req.user._id,
    title,
    description,
    tag,
  });

  res.json({ success: true, newNote });
});

//update Note Controller
const updateNote = catchAsyncError(async (req, res, next) => {
  const { title, description, tag } = req.body;

  const updatedNote = await Note.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title,
        description,
        tag,
      },
    }
  );

  // If Note Not found
  if (!updatedNote) {
    return next(new ErrorHandler("Note not Found", 400));
  }

  return res.json({ success: true, updatedNote });
});

//delete Note Controller
const deleteNote = catchAsyncError(async (req, res, next) => {
  // Find and Delete Note
  const deletedNote = await Note.findOneAndDelete({ _id: req.params.id });

  // If Note Not found
  if (!deletedNote) {
    return next(new ErrorHandler("Note not Found", 400));
  }

  res.json({ success: true, deletedNote });
});

export { getNotes, addNote, deleteNote, updateNote };
