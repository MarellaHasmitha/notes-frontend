// src/components/NoteForm.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import "./NoteForm.css";

export default function NoteForm({ onSave, onCancel, extraBtn, isEdit = false }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(""); 
  const { id } = useParams();

  // Prefill for edit
  useEffect(() => {
    if (isEdit && id) {
      API.get(`/notes/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch((err) => {
          console.error("Error fetching note:", err);
          if (err.response?.data?.message) {
            setError(`❌ ${err.response.data.message}`);
          } else {
            setError("❌ Failed to load note for editing.");
          }
        });
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      if (isEdit) {
        await onSave(id, { title, content });
      } else {
        await onSave({ title, content });
      }
    } catch (err) {
      console.error("Submit note error:", err);
      if (err.response?.data?.message) {
        setError(`❌ ${err.response.data.message}`);
      } else {
        setError("❌ Failed to save note. Please try again.");
      }
    }
  };

  return (
    <div className="note-form-container">
      <h2>{isEdit ? "✏️ Edit Note" : "➕ Add Note"}</h2>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="form-textarea"
        ></textarea>

        <div className="form-actions">
          <button type="submit" className="btn btn-green">
            {isEdit ? "💾 Save Changes" : "💾 Save Note"}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-gray">
            ⬅️ {isEdit ? "Back to Notes" : "Back to Home"}
          </button>
          {extraBtn && (
            <button type="button" onClick={extraBtn.action} className="btn btn-blue">
              {extraBtn.label}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
