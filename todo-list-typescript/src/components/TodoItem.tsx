import { useState } from "react";
import type { TodoItemProps } from "../types";

export default function TodoItem({ todo, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todo);
  const [editedDetails, setEditedDetails] = useState(todo.details);
  const [viewDetails, setViewDetails] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  function handleSave() {
    if (!editedText) return;
    onEdit(todo.id, editedText, editedDetails);
    setIsEditing((isEditing) => !isEditing);
  }

  function handleViewDetails() {
    setViewDetails((viewDetails) => !viewDetails);
  }

  function handleCompleted() {
    setIsCompleted((isCompleted) => !isCompleted);
  }

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <div className="edit-mode">
            <label>Todo: </label>
            <input
              className="input"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <label>Details: </label>
            <input
              className="input"
              value={editedDetails}
              onChange={(e) => setEditedDetails(e.target.value)}
            />
            <button className="btn primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="todo-row">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleCompleted}
            />
            <div className={`todo-text ${isCompleted ? "completed" : ""}`}>
              {todo.todo}
            </div>
            <div className="actions">
              <button
                className="btn edit"
                onClick={() => setIsEditing((isEditing) => !isEditing)}
              >
                Edit
              </button>
              <button className="btn delete" onClick={() => onDelete(todo.id)}>
                Delete
              </button>
              <button className="btn secondary" onClick={handleViewDetails}>
                {viewDetails ? "Hide Details" : "View Details"}
              </button>
            </div>
          </div>
        </>
      )}

      {viewDetails && <div className="details">{todo.details}</div>}
    </li>
  );
}
