const secrets = require('./secrets');

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host     : 'potluck.c6o4e5jzyjzo.us-east-2.rds.amazonaws.com',
    database : 'Potluck',
    user     : 'admin',
    password : secrets.dbpw(),
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

app.get('/CreateDB', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const chefid = req.query.id
        connection.query('CREATE DATABASE IF NOT EXISTS Potluck;', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

app.get('/CreateTables', function (req, res) {
    var fs = require('fs');
    var queries = fs.readFileSync('./create_tables.sql', 'utf8').split('\n');
    var results_arr = [];
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        queries.forEach((query) => {
            connection.query(query, function (error, results, fields) {
                // If some error occurs, we throw an error.
                if (error) throw error;
        
                // Getting the 'response' from the database and sending it to our route. This is were the data is.
                results_arr.push(results);
            });
        });
        res.send(results_arr);
        connection.release();
    });
});

app.get('/ShowTables', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        connection.query('SHOW TABLES;', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
        });
        connection.release();
    });
});

app.get('/query', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const query = req.query.query
        connection.query(query, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

app.get('/insertChefs', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        var query = "INSERT INTO Chef(chefid, name, bio, shortDesc, location, rating, numReviews, profilePic) VALUES ";
        var fs = require('fs');
        var rows = fs.readFileSync('./fake_data/chef.csv', 'utf8').split('\r\n');
        var results_arr = [];
        //query = query + "(" + rows[0] + "), ";
        
        rows.forEach((row,index) => {
            if(index!=0){
                var entry = "(" + row + "), ";
                query = query + entry;
            }
        })
        
        query = query.substring(0, query.length-2) +";";
        connection.query(query, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        results_arr.push(results)
        });
        res.send("No Errors");
        connection.release();
    });
});

app.get('/insertDishes', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        var query = "INSERT INTO Dish VALUES ";
        var fs = require('fs');
        var rows = fs.readFileSync('./fake_data/dish.csv', 'utf8').split('\r\n');
        var results_arr = [];

        rows.forEach((row,index) => {
            if(index!=0){
                var entry = "(" + row + "), ";
                query = query + entry;
            }
        })
        
        query = query.substring(0, query.length-2) +";";
        connection.query(query, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        results_arr.push(results)
        });
        res.send(results_arr);
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