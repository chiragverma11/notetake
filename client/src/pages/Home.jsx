import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/home.scss";
import { TextareaAutosize } from "@mui/base";
import { Masonry } from "@mui/lab";
import { FaTrash } from "react-icons/fa";
import NoteModal from "../components/NoteModal";
import useClickOutside from "../hooks/useClickOutside";
import {
  fetchNotes,
  addNote,
  deleteNote,
  updateNote,
  noteChanged,
} from "../slices/noteSlice";

const Home = ({ pageTitle }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.note.isLoading);
  const isAdding = useSelector((state) => state.note.isAdding);
  const isNoteChange = useSelector((state) => state.note.isNoteChange);
  const notess = useSelector((state) => state.note.notes);

  //useStates
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [note, setNote] = useState({});
  const [showNote, setShowNote] = useState(false);

  const noteRef = useRef(null);

  useEffect(() => {
    //Changing Page Title as the page Loads
    document.title = pageTitle;
    dispatch(fetchNotes());
  }, []);

  useEffect(() => {
    isNoteChange && handleUpdateNote();
    return () => {
      isNoteChange && dispatch(noteChanged(false));
    };
  }, [showNote]);

  const clickOutside = useClickOutside();
  clickOutside(noteRef, () => {
    setShowNote(false);
  });

  async function handleNewNote() {
    dispatch(addNote(newNote));
    setNewNote({ title: "", description: "", tag: "" });
  }

  async function handleDeleteNote(id) {
    dispatch(deleteNote(id));
  }

  async function handleUpdateNote() {
    dispatch(updateNote(note));
  }

  async function viewNote(index) {
    setShowNote(true);
    setNote(() => notess[notess.length - 1 - index]);
  }

  return (
    <>
      <main>
        <div className="newNote_wrapper">
          <div className="newNote_container">
            <TextareaAutosize
              className="newNote_textArea newNote_title"
              placeholder="Title"
              value={newNote.title}
              name="title"
              onChange={(e) =>
                setNewNote({ ...newNote, [e.target.name]: e.target.value })
              }
            ></TextareaAutosize>
            <TextareaAutosize
              className="newNote_textArea newNote_description"
              placeholder="Take a note..."
              value={newNote.description}
              name="description"
              onChange={(e) =>
                setNewNote({ ...newNote, [e.target.name]: e.target.value })
              }
            ></TextareaAutosize>
            <div className="newNote_info">
              <label htmlFor="newNote_tag" className="tag_wrapper">
                #
                <TextareaAutosize
                  className="newNote_textArea newNote_tag"
                  // placeholder="#"
                  id="newNote_tag"
                  spellCheck="false"
                  value={newNote.tag}
                  name="tag"
                  onChange={(e) =>
                    setNewNote({ ...newNote, [e.target.name]: e.target.value })
                  }
                ></TextareaAutosize>
              </label>
              <div className="newNote_control">
                <button
                  className="newNote_btn reset_btn"
                  onClick={() =>
                    setNewNote({ title: "", description: "", tag: "" })
                  }
                  disabled={
                    (newNote.title.length == 0 &&
                      newNote.description.length == 0 &&
                      newNote.tag.length == 0) ||
                    isAdding
                  }
                >
                  Reset
                </button>
                <button
                  className="newNote_btn save_btn"
                  onClick={handleNewNote}
                  disabled={
                    (newNote.title.length == 0 &&
                      newNote.description.length == 0 &&
                      newNote.tag.length == 0) ||
                    isAdding
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="notes_wrapper">
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : notess?.length === 0 ? (
            <p className="alt_notes">Notes you add appear here</p>
          ) : (
            <>
              <Masonry
                columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing={2}
                className="masonry_layout"
              >
                {notess
                  ?.slice()
                  .reverse()
                  .map((note, index) => {
                    return (
                      <div
                        className="note_card"
                        key={note._id}
                        id="noteCard"
                        onClick={(e) => {
                          if (e.target.id != "deleteNote") {
                            viewNote(index);
                          }
                        }}
                      >
                        <h3 className="note_title">{note.title}</h3>
                        <p className="note_description">
                          {note.description.length > 300
                            ? note.description.slice(0, 395) + "..."
                            : note.description}
                        </p>
                        {note.tag && <p className="note_tag">{note.tag}</p>}
                        <button
                          className="note_delete"
                          id="deleteNote"
                          onClick={() => {
                            handleDeleteNote(note._id);
                          }}
                        >
                          <FaTrash pointerEvents={"none"} />
                        </button>
                      </div>
                    );
                  })}
              </Masonry>
            </>
          )}
        </div>
      </main>
      {showNote && (
        <NoteModal
          note={note}
          setNote={setNote}
          setShowNote={setShowNote}
          handleUpdateNote={handleUpdateNote}
          noteRef={noteRef}
        />
      )}
    </>
  );
};

export default Home;
