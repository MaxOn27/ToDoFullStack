import express from "express";
import cors from "cors";
import TodoRoutes from "./routes/TodoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(TodoRoutes);

app.listen(8080, ()=> console.log('Server up and running...'));