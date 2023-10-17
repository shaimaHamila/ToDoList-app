import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const TotalComplete = () => {
  const state = useSelector((state: RootState) =>
    state.todos.todos.filter((todo) => todo.completed === true)
  );
  return <h1 className="mt-3">Total complete items: {state.length}</h1>;
};
export default TotalComplete;
