import { useEffect, useState } from "react";
import API from "../api/axios";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import "./Notes.css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(""); // ❌ Error state

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to fetch notes. Please try again.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add a new note
  const handleAdd = async (note) => {
    try {
      await API.post("/notes", note);
      fetchNotes();
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to add note. Please try again.");
    }
  };

  // Delete a note
  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to delete note. Please try again.");
    }
  };

  return (
    <div className="notes-container">
      {error && <p className="error-msg">{error}</p>} {/* Display error */}

      <NoteForm onAdd={handleAdd} />

      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={() => handleDelete(note.id)} />
        ))}
      </div>
    </div>
  );
}
