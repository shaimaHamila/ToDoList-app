import { useSelector } from "react-redux";
import ToDoItem, { ToDoItemProps } from "./ToDoItem";
import store, { RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchTodos } from "../redux/todoSlice";

const ToDoList = () => {
  const todos = useSelector((state: RootState) => state.todos);
  useEffect(() => {
    store.dispatch(fetchTodos());
  }, []);
  return (
    <ul className="list-group">
      {todos.todos.map((todo: ToDoItemProps, key) => (
        <ToDoItem
          key={key}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
};
export default ToDoList;
