const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'MaxUser',
    database: 'todo',
    password: 'MyMySQL@271212!',
});

module.exports = pool.promise();