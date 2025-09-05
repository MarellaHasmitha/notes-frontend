import "./NoteCard.css";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <button onClick={onDelete} className="note-delete">Delete</button>
    </div>
  );
}
