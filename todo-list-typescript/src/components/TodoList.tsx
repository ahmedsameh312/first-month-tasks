import TodoItem from "./TodoItem";
import type { Todo } from "../types";

interface TodoListProps {
  todos: Todo[];
  onDeleteItem: (id: number) => void;
  onEditItem: (id: number, text: string, details: string) => void;
}

export default function TodoList({
  todos,
  onDeleteItem,
  onEditItem,
}: TodoListProps) {
  return (
    <div className="list-container">
      <ul className="todo-list">
        {todos.map((item: Todo) => (
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
