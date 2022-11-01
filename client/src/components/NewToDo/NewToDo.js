import React, {useState} from 'react';

import Axios from "axios";

const NewToDo = () => {

    const [todo, setTodo] = useState("");

    const postNewTodo = async (event) => {
        event.preventDefault();
        if(todo === "") {
            return alert("input cannot be empty!")
        }
        await Axios.post("http://localhost:8080/api/post_newToDO", {
            todo
        });
    };

    return (
        <form action=""
              method="POST"
              className="new_todo_form"
              onSubmit={postNewTodo}>
            <input type="text" placeholder="What should you do?" value={todo}
                   onChange={event => setTodo(event.target.value)}/>
            <button onClick={() => {
                if (todo !== "") window.location.reload()
            }}>Submit</button>
        </form>
    );
};

export default NewToDo;