import { useState } from "react";
import store from "../redux/store";
import { addToDo, addTodoAsync } from "../redux/todoSlice";

const AddToDoForm = () => {
  const [toDoItemValue, setToDOItemValue] = useState("");
  const addToDoSubmit = (event: any) => {
    event.preventDefault();
    toDoItemValue ? store.dispatch(addTodoAsync({ title: toDoItemValue })) : "";
    setToDOItemValue("");
  };
  return (
    <form className="form-inline   mt-3 mb-3 ">
      <label className="sr-only">Name</label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        value={toDoItemValue}
        onChange={(event) => {
          setToDOItemValue(event.target.value);
        }}
      />

      <button
        onClick={addToDoSubmit}
        type="submit"
        className="btn btn-primary mb-2">
        Submit
      </button>
    </form>
  );
};
export default AddToDoForm;
