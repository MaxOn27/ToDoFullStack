import Todo from "../TodoModel/TodoModel.js";

export const getTodos = async (req, res) => {
    try {
        const response = await Todo.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getTodoById = async (req, res) =>{
    try {
        const response = await Todo.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createTodo = async (req, res) =>{
    try {
        await Todo.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTodo = async (req, res) =>{
    try {
        await Todo.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTodo = async (req, res) =>{
    try {
        await Todo.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}