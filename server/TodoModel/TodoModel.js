import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Todo = db.define("todos", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    todo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// module.exports. = Todo;
export default Todo;
(async () => {
    await db.sync();
})();