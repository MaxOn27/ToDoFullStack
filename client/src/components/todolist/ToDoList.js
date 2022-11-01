import React, {useState, useEffect} from 'react';
import Axios from "axios";

import "../../App.css";

const ToDoList = () => {
    const [toDoList, setToDoList] = useState([]);

    const getToDoList = async () => {
        const response = await Axios.get("http://localhost:8080/api/toDoList");
        setToDoList(response.data);
    };

    useEffect(() => {
        getToDoList()
            .then(() => console.log("To do list", toDoList))
            .catch((error) => console.log("error", error));
    }, []);

    const deleteTodo = ({id, todo}) => {
        if (window.confirm(`Do you really want to delete ${todo}?`)) {
            Axios.delete(`http://localhost:8080/api/delete_todo/${id}`)
                .then(toDoList => console.log(toDoList))
                .catch(error => console.log(error));
        }

        setTimeout(() => getToDoList(), 200);
    }

    return (
        <div className="to_do_list">
            <div className="to_do_header">
                <p>
                    Tasks
                </p>
                {/*<div>*/}
                {/*    <button>ADD</button>*/}
                {/*</div>*/}
            </div>
            <div className="to_do_body">
                {toDoList.map(todoItem => (
                    <div key={todoItem.id} className="to_do">
                        <div>
                            {todoItem.todo}
                        </div>
                        <div>
                            <button>EDIT</button>
                            <button
                                onClick={() => deleteTodo(todoItem)}>
                                DELETE
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ToDoList;