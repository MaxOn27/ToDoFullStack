const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: '',
    database: '',
    password: '',
});

module.exports = pool.promise();