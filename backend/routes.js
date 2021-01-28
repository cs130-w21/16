const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'potluck'
});

// We're still in routes.js! Right below everything else.

// Starting our app.
const app = express();

// Creating a GET route that returns data from the 'users' table.
app.get('/chefs', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        // Executing the MySQL query (select all data from the 'users' table).
        connection.query('SELECT * FROM Chefs', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
    });
});

// Starting our server.
app.listen(19003, () => {
 console.log('Go to http://localhost:19003/Chefs so you can see the data.');
});