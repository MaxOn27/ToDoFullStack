import {Sequelize} from "sequelize";

const db = new Sequelize(
    "todo_db",
    "",
    "",
    {host: "localhost", dialect: "mysql"}
);

export default db;