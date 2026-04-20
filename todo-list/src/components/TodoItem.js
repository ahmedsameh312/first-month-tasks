import { useState } from "react";

export default function TodoItem({ todo, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todo);
  const [viewDetails, setViewDetails] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  function handleSave() {
    if (!editedText) return;
    onEdit(todo.id, editedText);
    setIsEditing((isEditing) => !isEditing);
  }

  function handleViewDetails() {
    setViewDetails((viewDetails) => !viewDetails);
  }

  function handleCompleted() {
    setIsCompleted((isCompleted) => !isCompleted);
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            value={isCompleted}
            onClick={handleCompleted}
          />
          <div className={isCompleted ? "completed" : ""}>{todo.todo}</div>
          <button onClick={() => setIsEditing((isEditing) => !isEditing)}>
            Edit
          </button>
        </>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
      <button onClick={handleViewDetails}>
        {viewDetails ? "Hide Details" : "View Details"}
      </button>
      {viewDetails && <div>{todo.details}</div>}
    </li>
  );
}
