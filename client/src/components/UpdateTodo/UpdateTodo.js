import React, {Fragment, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import Axios from "axios";
import {FaArrowLeft} from "react-icons/fa"

import "../../App.css";

const UpdateTodo = ({open, onClose, todo, handleEscape}) => {
    const [updatedTodo, setUpdatedTodo] = useState({todo: ""});

    useEffect(() => {
        setUpdatedTodo(todo);
    }, [todo]);

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                handleEscape();
            }
        }
        document.addEventListener("keydown", keyDownHandler);

        return () =>
            document.removeEventListener("keydown", keyDownHandler);
    }, []);

    const updateHandler = async (event) => {
        event.preventDefault();
        const id = updatedTodo.id

        if (updatedTodo.todo !== "") window.location.reload();

        await Axios.put(`http://localhost:8080/api/update/${id}`,
            updatedTodo
        )
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
    }

    if (!open) return false;
    return ReactDOM.createPortal(
        <Fragment>
            <div className="overlay" onClick={onClose}/>
            <div className="edit_modal">
                <button onClick={onClose}
                        className="arrow-left-btn">
                    <FaArrowLeft/>
                </button>
                <form
                    action="/"
                    method="PUT"
                    className="add-update-todo"
                    onSubmit={updateHandler}
                >
                    <input
                        type="text"
                        value={updatedTodo ? updatedTodo.todo : ""}
                        onChange={(event) => setUpdatedTodo(() => {
                            return {
                                todo: event.target.value,
                                id: updatedTodo.id
                            }
                        })}
                    />
                    <button>SUBMIT</button>
                </form>
            </div>
        </Fragment>,
        document.getElementById("portal")
    );
};

export default UpdateTodo;