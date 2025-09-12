// src/pages/Notes.jsx
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import "./Notes.css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const msgTimeoutRef = useRef(null);

  // -----------------------------
  // Show success message for 5 seconds
  // -----------------------------
  const showMessage = (text) => {
    if (msgTimeoutRef.current) clearTimeout(msgTimeoutRef.current);
    setMessage(text);
    msgTimeoutRef.current = setTimeout(() => {
      setMessage("");
      msgTimeoutRef.current = null;
    }, 2000); // 2 seconds
  };

  // -----------------------------
  // Show error (stays until next action)
  // -----------------------------
  const showError = (text) => {
    setError(text);
  };

  // -----------------------------
  // Fetch all notes
  // -----------------------------
  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        "❌ Could not fetch notes. Please try again.";
      showError(msg);
    }
  };

  // -----------------------------
  // Add note
  // -----------------------------
  const addNote = async (note) => {
    try {
      await API.post("/notes", note);
      showMessage("✅ Note added successfully!");
      await fetchNotes();
      navigate("/notes");
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        "❌ Failed to add note. Please try again.";
      showError(msg);
    }
  };

  // -----------------------------
  // Update note
  // -----------------------------
  const updateNote = async (id, updatedNote) => {
    try {
      await API.put(`/notes/${id}`, updatedNote);
      showMessage("✏️ Note updated successfully!");
      await fetchNotes();
      navigate("/notes");
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        "❌ Failed to update note. Please try again.";
      showError(msg);
    }
  };

  // -----------------------------
  // Delete note
  // -----------------------------
  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      showMessage("🗑️ Note deleted successfully!");
      await fetchNotes();
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        "❌ Failed to delete note. Please try again.";
      showError(msg);
    }
  };

  // -----------------------------
  // Initial fetch or skip when on add page
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Only fetch notes if not on add page
    if (location.pathname !== "/notes/add") {
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (msgTimeoutRef.current) clearTimeout(msgTimeoutRef.current);
    };
  }, []);

  return (
    <div className="notes-container">
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <Routes>
        {/* Add Note */}
        <Route
          path="add"
          element={
            <NoteForm
              onSave={addNote}
              onCancel={() => navigate("/")}
              extraBtn={{ label: "List All Notes", action: () => navigate("/notes") }}
            />
          }
        />

        {/* List Notes */}
        <Route
          path="/"
          element={
            <div>
              <h2 className="page-title">📒 My Notes</h2>
              <div className="notes-grid">
                {notes.length === 0 ? (
                  <p>No notes found. Click "Add Note" to create one.</p>
                ) : (
                  notes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onDelete={() => deleteNote(note.id)}
                      onUpdate={() => navigate(`/notes/edit/${note.id}`)}
                    />
                  ))
                )}
              </div>
              <div className="page-actions">
                <button onClick={() => navigate("/")} className="btn btn-gray">
                  ⬅️ Back to Home
                </button>
                <button onClick={() => navigate("/notes/add")} className="btn btn-green">
                  ➕ Add Note
                </button>
              </div>
            </div>
          }
        />

        {/* Edit Note */}
        <Route
          path="edit/:id"
          element={<NoteForm isEdit onSave={updateNote} onCancel={() => navigate("/notes")} />}
        />
      </Routes>
    </div>
  );
}
