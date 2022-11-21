import React, {useState, Fragment, useEffect} from 'react';
import ReactDOM from "react-dom";
import Axios from "axios";
import {FaArrowLeft} from "react-icons/fa";

import "../../App.css"

const NewToDo = ({openCreateTodo, onClose, toDoList}) => {
    const [todo, setTodo] = useState("");

    const postNewTodo = async (event) => {
        event.preventDefault();

        const isInList = toDoList.find(listItem => listItem.todo === todo);

        if (typeof isInList !== "undefined")
            return alert("The TO-DO is already in the list!");

        if (todo === "") return alert("input cannot be empty!");

        if (todo !== "") window.location.reload();

        await Axios.post(
            "http://localhost:8080/api/post_newToDO",
            {
                todo
            }
        );


    };

    if (!openCreateTodo) return false;
    return ReactDOM.createPortal(
        <Fragment>
            <div className="overlay"/>
            <div className="edit_modal">
                <button onClick={onClose} className="arrow-left-btn">
                    <FaArrowLeft/>
                </button>
                <form action="/"
                      method="POST"
                      className="add-update-todo"
                      onSubmit={postNewTodo}>
                    <input type="text"
                           placeholder="What should you do?"
                           onChange={event => setTodo(event.target.value)}/>
                    <button>Submit</button>
                </form>
            </div>
        </Fragment>,
        document.getElementById("portal")
    );
};

export default NewToDo;