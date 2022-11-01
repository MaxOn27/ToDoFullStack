const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/toDoList", (req, res) => {
    db.execute("SELECT * FROM todolist")
        .then(([toDoList]) => {
            res.send(toDoList);
            console.log("Response: ", toDoList)
        })
        .catch(error => {
            console.log(error);
        });
});

app.post("/api/post_newToDO",
    (req, res) => {
        const todo = req.body.todo
        db.execute("INSERT INTO todolist (todo) VALUES (?)",
            [todo],
            (error, result) => {
                    if (error) {
                        console.log(error)
                    }
                }
            );

    });

app.delete("/api/delete_todo/:id",
    (req, res) => {
        const {id} = req.params;
        db.execute("DELETE FROM todolist WHERE id = ?",
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