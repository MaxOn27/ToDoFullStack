import React, {Fragment, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import Axios from "axios";
import {FaArrowLeft} from "react-icons/fa"

import "../../App.css";

const Modal = ({open, onClose, todo}) => {
    const [updatedTodo, setUpdatedTodo] = useState({todo: ""});

    useEffect(() => {
            setUpdatedTodo(todo);
    }, [todo]);

    const updateTodo = async (event) => {
        event.preventDefault();
        const id = updatedTodo.id

        if (updatedTodo.todo !== "") window.location.reload();

        await Axios.put(`http://localhost:8080/api/update/${id}`,
            updatedTodo
        )
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
    }

    if(!open) return false;
    return ReactDOM.createPortal(
        <Fragment>
            <div className="overlay"/>
            <div className="edit_modal">
                <button onClick={onClose} className="arrow-left-btn">
                    <FaArrowLeft/>
                </button>
                <form
                    action=""
                    method="PUT"
                    className="edit-block"
                    onSubmit={updateTodo}
                >
                    <input
                        type="text"
                        value={updatedTodo ? updatedTodo.todo : ""}
                        onChange={(event) => setUpdatedTodo(() => {
                            return {todo: event.target.value, id: updatedTodo.id}
                        })}
                    />
                    <button >SUBMIT</button>
                </form>
            </div>
        </Fragment>,
        document.getElementById("portal")
    );
};

export default Modal;