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

app.get('/AllDishes', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        connection.query('SELECT * FROM Dish', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

app.get('/AvailableDishes', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        connection.query('SELECT * FROM Dish WHERE available', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

app.get('/ChefInfo', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const chefid = req.query.id
        connection.query('SELECT * FROM Chef WHERE chefid = '+chefid, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

app.get('/CoverPhotos', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const chefid = req.query.id
        connection.query('SELECT primaryImage FROM Dish WHERE chefid = '+chefid, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

app.get('/ChefsDishes', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const chefid = req.query.id
        connection.query('SELECT * FROM Dish WHERE chefid = '+chefid+' ORDER BY available DESC, rating DESC', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});


// Starting our server.
var args = process.argv.slice(2);
var port;
if(args.length == 0){
    port=8888;
}
else{port = parseInt(args[0]);}
app.listen(port, () => {
 console.log('Go to http://3.141.20.190:' + port.toString() +'/AllDishes so you can see the data.');
 // Use fetch('http://<ip where db is hosted or localhost>:3000/Chefs') to fetch
});