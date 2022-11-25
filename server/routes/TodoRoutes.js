import express from "express";

import {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
} from "../TodoControllers/TodoController.js";

const router = express.Router();

router.get("/api/toDoList", getTodos);
router.get("/api/todo/:id", getTodoById);
router.post("/api/post_newToDO", createTodo);
router.put("/api/update/:id", updateTodo);
router.delete("/api/delete_todo/:id", deleteTodo);

export default router;