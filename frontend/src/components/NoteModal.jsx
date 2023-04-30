import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/base";

const NoteModal = ({ note, setNote, setShowNote, updateNote }) => {
  const [date, setDate] = useState(null);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    formatDate();
  }, [isChange]);

  const formatDate = () => {
    const dateString = new Date(note.updatedAt);

    const currentDate = new Date().toDateString();

    if (dateString.toDateString == currentDate) {
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
        <div className="note_container">
          <div className="note_details">
            <TextareaAutosize
              className="note_textArea note_title"
              placeholder="Title"
              value={note.title}
              name="title"
              onInput={() => {
                setIsChange(true);
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
                setIsChange(true);
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
                  setIsChange(true);
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

                  isChange && updateNote();
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
