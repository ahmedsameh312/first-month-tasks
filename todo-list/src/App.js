import { todos as initialTodos } from "./data";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(text, details) {
    const newTodo = {
      id: Date.now(),
      todo: text,
      details: details,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function handleDeleteTodo(id) {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }

  function handleEditTodo(id, newText) {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, todo: newText } : item)),
    );
  }

  return (
    <div>
      <AddForm onAddItem={handleAddTodo} />
      <TodoList
        todos={todos}
        onDeleteItem={handleDeleteTodo}
        onEditItem={handleEditTodo}
      />
    </div>
  );
}

function AddForm({ onAddItem }) {
  const [text, setText] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) {
      return;
    }
    onAddItem(text, details);
    setText("");
    setDetails("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Todo: </label>
      <input
        placeholder="Add new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label>Details: </label>
      <input
        placeholder="Todo's Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function TodoList({ todos, onDeleteItem, onEditItem }) {
  return (
    <div>
      <ul>
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
            onDelete={onDeleteItem}
            onEdit={onEditItem}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo, onDelete, onEdit }) {
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
