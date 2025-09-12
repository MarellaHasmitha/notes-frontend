// src/components/NoteCard.jsx
import "./NoteCard.css";

export default function NoteCard({ note, onDelete, onUpdate }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-actions">
        <button onClick={onUpdate} className="btn btn-yellow">
          ✏️ Update
        </button>
        <button onClick={onDelete} className="btn btn-red">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
