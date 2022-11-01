import './App.css';

import ToDoList from "./components/todolist/ToDoList";
import NewToDo from "./components/NewToDo/NewToDo";

function App() {
  return (
    <div className="App">
      <NewToDo/>
      <ToDoList/>
    </div>
  );
}

export default App;
