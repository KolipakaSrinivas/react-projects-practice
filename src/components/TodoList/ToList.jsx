import { useEffect, useState } from "react";
import "./styles.css";

const initialTodos = [
  {
    id: 7372,
    todo: "Wake up and stretch: 5–10 minutes of light movement.",
    completed: false,
  },
  {
    id: 23983,
    todo: "Short break: 10–15 minutes to recharge.",
    completed: true,
  },
  {
    id: 2873892,
    todo: "Exercise or walk: 30 minutes of movement.",
    completed: false,
  },
  {
    id: 276382,
    todo: "Reflect on the day: Note wins and lessons.",
    completed: false,
  },
];

export default function TodoList() {
  const [todoList, setTodoList] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : initialTodos;
  });

  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const handleAdd = () => {
    if (todo.trim().length < 3) {
      alert("Please add a valid todo");
      return;
    }

    setTodoList((prev) => [
      ...prev,
      { id: Date.now(), todo: todo.trim(), completed: false },
    ]);

    setTodo("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTodo(value);
  };
  const handleCompleted = (id) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <div className="container">
      <h1 className="heading">To Do List</h1>
      <div>
        <input
          type="text"
          className="input"
          name="toDo"
          value={todo}
          onChange={handleChange}
          placeholder="Enter todo"
        />
        <button className="button" onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todoList.length > 0 ? (
          todoList.map((item) => {
            return (
              <li key={item.id} className={`${item.completed && "completed"}`}>
                <span onClick={() => handleCompleted(item.id)}>
                  {item.todo}
                </span>
                <button
                  id="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  ❌
                </button>
              </li>
            );
          })
        ) : (
          <li>No To Do's</li>
        )}
      </ul>
    </div>
  );
}
