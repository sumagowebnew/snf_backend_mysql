// // db.js
// const mysql = require('mysql2');
// const env = require("dotenv").config();

// const db = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.MYsql_USER,
//     password: process.env.MYsql_PASS,
//     database: process.env.MYsql_DB
// });

// db.connect((err) => {
//     if(err) {
//         throw err;
//     }
//     console.log('MySQL Connected...');
// });

// module.exports = db;


const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYsql_USER,
    password: process.env.MYsql_PASS,
    database: process.env.MYsql_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('MySQL Connected...');
    connection.release();
});

module.exports = pool;