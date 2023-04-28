import React, { useState, useContext, useEffect, useRef } from "react";
import "../styles/home.scss";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { TextareaAutosize } from "@mui/base";
import { Masonry } from "@mui/lab";

import { FaTrash } from "react-icons/fa";

//this function is just used for developement because if I use this website over my local wifi server then the backend cannot respond and set cookie because of same site problem
let baseUrl = "http://localhost:8080/api";
const detectDeviceType = () => {
  baseUrl =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "http://192.168.1.6:8080/api"
      : "http://localhost:8080/api";
};

const Home = ({ pageTitle }) => {
  const user = useContext(UserContext);

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
    detectDeviceType();
    setLoading(true);
    getNotes();
  }, []);

  async function getNotes() {
    try {
      // setLoading(true);
      const response = await axios({
        method: "get",
        url: `${baseUrl}/notes`,
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
        url: `${baseUrl}/note`,
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
        url: `${baseUrl}/note/${id}`,
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
        url: `${baseUrl}/note/${note._id}`,
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

  const ViewNote = ({ note, setNote }) => {
    return (
      <>
        <div className="noteModal">
          <div className="note_container">
            <div className="note_details">
              <TextareaAutosize
                className="note_textArea note_title"
                placeholder="Title"
                value={note.title}
                name="title"
                onChange={(e) =>
                  setNote({ ...note, [e.target.name]: e.target.value })
                }
              ></TextareaAutosize>
              <textarea
                className="note_textArea note_description"
                placeholder="Take a note..."
                value={note.description}
                name="description"
                onChange={(e) =>
                  setNote({ ...note, [e.target.name]: e.target.value })
                }
              ></textarea>
            </div>
            <div className="note_info">
              <label htmlFor="note_tag" className="tag_wrapper">
                #
                <TextareaAutosize
                  className="note_textArea note_tag"
                  // placeholder="#"
                  id="note_tag"
                  spellCheck="false"
                  value={note.tag}
                  name="tag"
                  onChange={(e) =>
                    setNote({ ...note, [e.target.name]: e.target.value })
                  }
                ></TextareaAutosize>
              </label>
              <div className="note_control">
                <button
                  className="note_btn close_btn"
                  onClick={() => {
                    setShowNote(false);
                    updateNote();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

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
            <p>Loading...</p>
          ) : notes.length === 0 ? (
            <p className="alt_notes">Notes you add appear here</p>
          ) : (
            <>
              <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 4 }} spacing={2}>
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
      {showNote && ViewNote({ note, setNote })}
    </>
  );
};

export default Home;
