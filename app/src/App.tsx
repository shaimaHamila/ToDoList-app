import "./App.scss";
import AddToDoForm from "./components/AddToDoForm";
import ToDoList from "./components/ToDoList";
import "bootstrap/dist/css/bootstrap.css";
import TotalComplete from "./components/TotalCompleteItems";
[
  { id: new Date("2020-01-24"), title: "todo1", completed: false },
  { id: new Date("2020-02-20"), title: "todo2", completed: false },
  { id: new Date("2021-03-22"), title: "todo3", completed: true },
  { id: new Date("2022-04-15"), title: "todo4", completed: false },
  { id: new Date("2023-05-10"), title: "todo5", completed: false },
];
function App() {
  return (
    <>
      <h1>Your To Do List</h1>
      <AddToDoForm />
      <br />
      <ToDoList />
      <br />
      <TotalComplete />
    </>
  );
}

export default App;
