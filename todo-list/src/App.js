import { todos as initialTodos } from "./data";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(text) {
    const newTodo = { id: Date.now(), todo: text, completed: false };
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

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) {
      return;
    }
    onAddItem(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Todo: </label>
      <input
        placeholder="Add new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
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

  function handleSave() {
    if (!editedText) return;
    onEdit(todo.id, editedText);
    setIsEditing((isEditing) => !isEditing);
  }

  function handleViewDetails() {
    setViewDetails((viewDetails) => !viewDetails);
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
          {todo.todo}
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
