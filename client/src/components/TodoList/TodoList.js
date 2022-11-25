import React, {useState, Fragment} from 'react';
import Axios from "axios";
import {FaPlus} from "react-icons/fa";

import UpdateTodo from "../UpdateTodo/UpdateTodo";
import CreateTodo from "../CreateTodo/CreateTodo";
import {useTodoContext} from "../../providers/TodoProvider";

import "../../App.css";

const TodoList = () => {
    const [isOpenCreateTodo, setIsOpenCreateTodo] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [todo, setTodo] = useState("");

    const {todoList, getToDoList} = useTodoContext();

    const getTodoById = async (id) => {
        const response = await Axios.get(`http://localhost:8080/api/todo/${id}`);
        setTodo(response.data);
        setIsOpenModal(true);
    };

    const deleteTodo = ({id, todo}) => {
        if (window.confirm(`Do you really want to delete ${todo}?`)) {
            Axios.delete(`http://localhost:8080/api/delete_todo/${id}`)
                .then(todoList => console.log(todoList))
                .catch(error => console.log(error));
        }

        setTimeout(() => getToDoList(), 200);
    };

    const handleEscape = () => {
        setIsOpenModal(false);
    };

    return (
        <Fragment>
            <div className="to_do_list">
                <div className="to_do_header">
                    <p>
                        TO-DOs
                    </p>
                    <button onClick={() => setIsOpenCreateTodo(true)}>
                        <FaPlus/>
                    </button>
                </div>
                <div className="to_do_body">
                    {todoList.map(todoItem => (
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
                <UpdateTodo
                    todo={todo}
                    open={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    handleEscape={handleEscape}
                />
                <CreateTodo
                    openCreateTodo={isOpenCreateTodo}
                    onClose={() => setIsOpenCreateTodo(false)}
                    todoList={todoList}
                />
            </div>
        </Fragment>
    );
};

export default TodoList;