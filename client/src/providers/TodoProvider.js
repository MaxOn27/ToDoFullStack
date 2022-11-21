import {createContext, useContext, useEffect, useState} from "react";
import Axios from "axios";

const TodoContext = createContext(null);

const TodoProvider = ({children}) => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        getToDoList()
            .then(() => console.log("TO-DOs", todoList))
            .catch(error => console.log("error", error));
    }, []);

    const getToDoList = async () => {
        const response = await Axios
            .get("http://localhost:8080/api/toDoList");
        setTodoList(response.data);
    };

    const contextValue = {
        todoList, getToDoList: getToDoList
    };

    return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
};

export const useTodoContext = () => useContext(TodoContext)

export default TodoProvider;