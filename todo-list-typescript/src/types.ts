export interface Todo {
  id: number;
  todo: string;
  details: string;
  completed: boolean;
}

export interface AddFormProps {
  onAddItem: (text: string, details: string) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onDeleteItem: (id: number) => void;
  onEditItem: (id: number, text: string, details: string) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string, details: string) => void;
}
