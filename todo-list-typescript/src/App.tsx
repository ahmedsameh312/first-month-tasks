import AddForm from "./components/AddForm";
import TodoList from "./components/TodoList";
import { useState } from "react";
import { todos as initialTodos } from "./data";
import type { Todo } from "./types";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function handleAddTodo(text: string, details: string) {
    const newTodo: Todo = {
      id: Date.now(),
      todo: text,
      details: details,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function handleDeleteTodo(id: number) {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }

  function handleEditTodo(id: number, newText: string, newDetails: string) {
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
