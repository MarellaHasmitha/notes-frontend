import { useEffect, useState } from "react";
import API from "../api/axios";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import "./Notes.css";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = async (note) => {
    await API.post("/notes", note);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="notes-container">
      <NoteForm onAdd={handleAdd} />
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={() => handleDelete(note.id)} />
        ))}
      </div>
    </div>
  );
}
