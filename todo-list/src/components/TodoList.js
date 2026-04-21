import TodoItem from "./TodoItem";

export default function TodoList({ todos, onDeleteItem, onEditItem }) {
  return (
    <div className="list-container">
      <ul className="todo-list">
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
