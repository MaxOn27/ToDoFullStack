const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/toDoList", (req, res) => {
    db.execute("SELECT * FROM TodoList")
        .then(([toDoList]) => {
            res.send(toDoList);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get("/api/todo/:id", (req, res) => {
    const {id} = req.params;
    db.execute(`SELECT todo, id FROM todolist WHERE id = ?`, [id])
        .then(([todo]) => {
            res.send(todo);
        })
        .catch(error => {
            console.log(error);
        });
});

app.post("/api/post_newToDO",
    (req, res) => {
        const todo = req.body.todo
        db.execute("INSERT INTO TodoList (todo) VALUES (?)",
            [todo],
            (error, result) => {
                    if (error) {
                        console.log(error)
                    }
                }
            );

    });

app.put("/api/update/:id",
    (req, res) => {
        const {todo, id} = req.body;
        db.execute("UPDATE TodoList SET todo = ? where id = ?", [todo, id], (err, result) => {
            if (err) {
                res.send("Error")
            } else {
                res.send("result")
            }
        });
    });

app.delete("/api/delete_todo/:id",
    (req, res) => {
        const {id} = req.params;
        db.execute("DELETE FROM TodoList WHERE id = ?",
            [id],
            (error, result) => {
                    if (error) {
                        console.log(error)
                    }
                }
            );

    });

app.listen(8080, () =>
    console.log("Server is running on localhost:8080"));