import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from "../services/noteService";

export const fetchNotes = createAsyncThunk("fetchNotes", async () => {
  const response = await noteService.fetchNotes();
  return response.data.notes;
});

export const addNote = createAsyncThunk("notes/addNote", async (data) => {
  const response = await noteService.addNote(data);
  return response.data;
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  const response = await noteService.deleteNote(id);
  return response.data;
});

export const updateNote = createAsyncThunk("notes/updateNote", async (data) => {
  const response = await noteService.updateNote(data);
  return response.data;
});

const initialState = {
  isLoading: false,
  isAdding: false,
  isNoteChange: false,
  error: null,
  notes: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {
    noteChanged: (state, action) => {
      state.isNoteChange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addNote.pending, (state, action) => {
        state.isAdding = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.isAdding = false;
        state.notes.push(action.payload.newNote);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.error.message;
      })
      .addCase(deleteNote.pending, (state, action) => {
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload.deletedNote._id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateNote.pending, (state, action) => {
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note._id === action.payload.afterUpdated._id
        );
        state.notes[index] = action.payload.afterUpdated;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { noteChanged } = noteSlice.actions;

export default noteSlice.reducer;
