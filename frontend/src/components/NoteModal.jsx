import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/base";
import { noteChanged } from "../slices/noteSlice";

const NoteModal = ({
  note,
  setNote,
  setShowNote,
  handleUpdateNote,
  noteRef,
}) => {
  const dispatch = useDispatch();
  const isNoteChange = useSelector((state) => state.note.isNoteChange);

  const [date, setDate] = useState(null);

  useEffect(() => {
    formatDate();
  }, [isNoteChange]);

  const formatDate = () => {
    const dateString = new Date(note.updatedAt);
    const currentDate = new Date();
    const compareDateYear =
      dateString.getDate() == currentDate.getDate() &&
      dateString.getFullYear() == currentDate.getFullYear();

    if (!compareDateYear) {
      setDate(
        dateString.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
    } else {
      setDate(
        dateString.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
    }
  };

  return createPortal(
    <>
      <div className="noteModal">
        <div className="note_container" ref={noteRef}>
          <div className="note_details">
            <TextareaAutosize
              className="note_textArea note_title"
              placeholder="Title"
              value={note.title}
              name="title"
              onInput={() => {
                dispatch(noteChanged(true));
              }}
              onChange={(e) =>
                setNote({ ...note, [e.target.name]: e.target.value })
              }
            ></TextareaAutosize>
            <textarea
              className="note_textArea note_description"
              placeholder="Take a note..."
              value={note.description}
              name="description"
              onInput={() => {
                dispatch(noteChanged(true));
              }}
              onChange={(e) =>
                setNote({ ...note, [e.target.name]: e.target.value })
              }
            ></textarea>
          </div>
          <div className="note_info">
            <label htmlFor="note_tag" className="tag_wrapper">
              #
              <textarea
                rows={1}
                className="note_textArea note_tag"
                id="note_tag"
                spellCheck="false"
                value={note.tag}
                name="tag"
                onInput={() => {
                  dispatch(noteChanged(true));
                }}
                onChange={(e) =>
                  setNote({ ...note, [e.target.name]: e.target.value })
                }
              ></textarea>
            </label>
            <span className="dateTime">Edited {" " + date}</span>
            <div className="note_control">
              <button
                className="note_btn close_btn"
                onClick={() => {
                  setShowNote(false);
                  isNoteChange && handleUpdateNote();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("NoteModal")
  );
};

export default NoteModal;
