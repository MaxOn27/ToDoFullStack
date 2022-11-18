import React, {useState, useEffect, Fragment} from 'react';
import Axios from "axios";
import Modal from "../Modal/Modal";

import "../../App.css";

const ToDoList = () => {
    const [toDoList, setToDoList] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [todo, setTodo] = useState("");

    const getToDoList = async () => {
        const response = await Axios
            .get("http://localhost:8080/api/toDoList");
        setToDoList(response.data);
    };

    const getTodoById = async (id) => {
        await Axios.get(`http://localhost:8080/api/todo/${id}`)
            .then(response => setTodo(response.data))
            .catch(error => console.log("Error", error));

        setIsOpenModal(true);
    };

    useEffect(() => {
        getToDoList()
            .then((response) => console.log("response", response.data))
            .catch((error) => console.log("error", error));
    }, []);

    const deleteTodo = ({id, todo}) => {
        if (window.confirm(`Do you really want to delete ${todo}?`)) {
            Axios.delete(`http://localhost:8080/api/delete_todo/${id}`)
                .then(toDoList => console.log(toDoList))
                .catch(error => console.log(error));
        }

        setTimeout(() => getToDoList(), 200);
    };

    return (
        <Fragment>
            <div className="to_do_list">
                <div className="to_do_header">
                    <p>
                        Tasks
                    </p>
                </div>
                <div className="to_do_body">
                    {toDoList.map(todoItem => (
                        <div key={todoItem.id} className="to_do">
                            <div>
                                {todoItem.todo}
                            </div>
                            <div>
                                <button
                                    onClick={() => getTodoById(todoItem.id)}
                                >EDIT
                                </button>
                                <button
                                    onClick={() => deleteTodo(todoItem)}>
                                    DELETE
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal
                    todo={todo[0]}
                    open={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                />
            </div>
        </Fragment>
    );
};

export default ToDoList;