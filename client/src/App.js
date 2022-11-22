import './App.css';

import TodoList from "./components/TodoList/TodoList";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import TodoProvider from "./providers/TodoProvider";

function App() {
  return (
    <div className="App">
        <TodoProvider>
          {/*<CreateTodo/>*/}
          <TodoList/>
        </TodoProvider>
    </div>
  );
}

export default App;
