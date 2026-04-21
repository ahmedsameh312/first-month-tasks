import { todos as initialTodos } from "./data";
import { useState } from "react";
import TodoList from "./components/TodoList";
import AddForm from "./components/AddForm";

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

  function handleEditTodo(id, newText, newDetails) {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, todo: newText, details: newDetails } : item,
      ),
    );
  }

  return (
    <div className="app">
      <h1 className="title">Todo App</h1>
      <AddForm onAddItem={handleAddTodo} />
      <TodoList
        todos={todos}
        onDeleteItem={handleDeleteTodo}
        onEditItem={handleEditTodo}
      />
    </div>
  );
}
