const secrets = require('./secrets');

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host     : 'sql3.freemysqlhosting.net',
    user     : 'sql3390836',
    password : secrets.dbpw(),
    database : 'sql3390836'
});

// Starting our app.
const app = express();

// Creating a GET route that returns data from the 'users' table.
app.get('/Chefs', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        connection.query('SELECT * FROM Chef', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});


// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/Chefs so you can see the data.');
 // Use fetch('http://<ip where db is hosted or localhost>:3000/Chefs') to fetch
});