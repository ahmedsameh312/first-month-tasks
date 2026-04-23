import TodoItem from "./TodoItem";
import type { Todo } from "../types";
import type { TodoListProps } from "../types";

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
