import React, { useState, useEffect } from "react";
import "../styles/home.scss";
// import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { TextareaAutosize } from "@mui/base";
import { Masonry } from "@mui/lab";
import { FaTrash } from "react-icons/fa";
import NoteModal from "../components/NoteModal";

const Home = ({ pageTitle }) => {
  // const user = useContext(UserContext);

  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [showNote, setShowNote] = useState(false);
  // const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    //Changing Page Title as the page Loads
    document.title = pageTitle;
    setLoading(true);
    getNotes();
  }, []);

  async function getNotes() {
    try {
      // setLoading(true);
      const response = await axios({
        method: "get",
        url: `/api/notes`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNotes(response.data.notes);
      return setLoading(false);
    } catch (error) {
      if (!error.response.data.success) {
        console.error(error.toJSON());
      }
    }
  }

  async function addNote() {
    try {
      setAdding(true);
      const response = await axios({
        method: "post",
        url: `/api/note`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: newNote,
      });
      setNewNote({ title: "", description: "", tag: "" });
      setAdding(false);
      return getNotes();
    } catch (error) {
      if (!error.response.data.success) {
        console.error(error.toJSON());
      }
    }
  }

  async function deleteNote(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `/api/note/${id}`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return getNotes();
    } catch (error) {
      if (!error.response.data.success) {
        console.error(error.toJSON());
      }
    }
  }

  async function updateNote() {
    try {
      const response = await axios({
        method: "patch",
        url: `/api/note/${note._id}`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: note,
      });
      return getNotes();
    } catch (error) {
      if (!error.response.data.success) {
        console.error(error.toJSON());
      }
    }
  }

  async function viewNote(index) {
    setShowNote(true);
    setNote(() => notes[notes.length - 1 - index]);
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
                    adding
                  }
                >
                  Reset
                </button>
                <button
                  className="newNote_btn save_btn"
                  onClick={addNote}
                  disabled={
                    (newNote.title.length == 0 &&
                      newNote.description.length == 0 &&
                      newNote.tag.length == 0) ||
                    adding
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="notes_wrapper">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : notes.length === 0 ? (
            <p className="alt_notes">Notes you add appear here</p>
          ) : (
            <>
              <Masonry
                columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing={2}
                className="masonry_layout"
              >
                {notes
                  .slice()
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
                            deleteNote(note._id);
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
          updateNote={updateNote}
        />
      )}
    </>
  );
};

export default Home;
