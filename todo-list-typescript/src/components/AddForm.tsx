import { useState } from "react";

interface AddFormProps {
  onAddItem: (text: string, details: string) => void;
}

export default function AddForm({ onAddItem }: AddFormProps) {
  const [text, setText] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text) {
      return;
    }
    onAddItem(text, details);
    setText("");
    setDetails("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Todo: </label>
      <input
        className="input"
        placeholder="Add new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label>Details: </label>
      <input
        className="input"
        placeholder="Todo's Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <button className="btn primary">Add</button>
    </form>
  );
}
