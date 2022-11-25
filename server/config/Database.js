import {Sequelize} from "sequelize";

const db = new Sequelize(
    "todo_db",
    "MaxUser",
    "MyMySQL@271212!",
    {host: "localhost", dialect: "mysql"}
);

export default db;