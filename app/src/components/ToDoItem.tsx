import store from "../redux/store";
import {
  deleteToDo,
  deleteTodoAsync,
  toggleComplete,
  toggleCompleteAsync,
} from "../redux/todoSlice";

export interface ToDoItemProps {
  id: string;
  title: string;
  completed: boolean;
}
const ToDoItem: React.FC<ToDoItemProps> = ({
  id,
  title,
  completed,
  ...props
}: ToDoItemProps) => {
  const handleComplete = () => {
    store.dispatch(toggleCompleteAsync({ id, title, completed: !completed }));
  };
  const handleDeleteClick = () => {
    store.dispatch(deleteTodoAsync({ id }));
  };
  return (
    <div className="d-flex justify-content-between align-items-center culomn">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          onClick={handleComplete}
          checked={completed}
        />
        <label className="form-check-label">{title}</label>
      </div>
      <button
        onClick={handleDeleteClick}
        type="button"
        className="btn btn-danger">
        Delete
      </button>
    </div>
  );
};
export default ToDoItem;
