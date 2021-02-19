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


////////////
// DISHES //
///////////

// ALL Dish entries in the Dish table
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

// All Dish entries of currently available dishes
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

// All Dish Primary Images for a specified chef ordered by dish rating
app.get('/CoverPhotos', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const chefid = req.query.id
        connection.query('SELECT primaryImage FROM Dish WHERE chefid = '+chefid+' ORDER BY rating DESC', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

// All Dish entries for a given chef
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



///////////
// CHEFS //
//////////

// All Chef entries in Chef table
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

// Table Entry for a specified chef
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

/////////////
// Reviews //
/////////////

// Add a new review
app.get('/newReview', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const dishid = req.query.dishid;
        const chefid = req.query.chefid;
        const reviewer = req.query.reviewer;
        const rating = req.query.rating;
        const comment = req.query.comment;
        const timestamp = req.query.timestamp;
        connection.query('INSERT INTO Review VALUES ('+dishid+','+chefid+',"'+reviewer+'",'+rating+',"'+comment+'","'+timestamp+'")', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

// Update Ratings on Specific Dish
app.get('/updateDishWithNewReview', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const dishid = req.query.dishid;
        const rating = req.query.rating;
        connection.query('UPDATE Dish SET rating = (numReviews*rating+'+rating+')/(numReviews+1), numReviews = numReviews+1 WHERE dishid='+dishid, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

// Update Ratings on Specific Chef
app.get('/updateChefWithNewReview', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const chefid = req.query.chefid;
        const rating = req.query.rating;
        connection.query('UPDATE Chef SET rating = (numReviews*rating+'+rating+')/(numReviews+1), numReviews = numReviews+1 WHERE chefid='+chefid, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

// Return ALL Reviews (for testing)
app.get('/AllReviews', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        connection.query('SELECT * FROM Review;', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

// Return Reviews for given dish
app.get('/getDishReviews', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const dishid = req.query.dishid;
        connection.query('SELECT * FROM Review WHERE dishid = '+dishid+' AND comment IS NOT NULL ORDER BY timestamp DESC', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

// Return Reviews for given chef
app.get('/getChefReviews', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const chefid = req.query.chefid;
        connection.query('SELECT R.dishid AS dishid, R.chefid AS chefid, R.reviewer as reviewer, R.rating as rating, R.comment AS comment, R.timestamp AS timestamp, D.name AS name FROM Review R JOIN Dish D ON R.dishid = D.dishid WHERE R.chefid = '+chefid+' AND R.comment IS NOT NULL ORDER BY R.timestamp DESC', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

// Return Reviews for given dish
app.get('/getNDishReviews', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const dishid = req.query.dishid;
        const n=req.query.n;
        connection.query('SELECT * FROM Review WHERE dishid = '+dishid+' AND comment IS NOT NULL ORDER BY timestamp DESC LIMIT '+n, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});

// Return Reviews for given chef
app.get('/getNChefReviews', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if(err) throw err;
        // Executing the MySQL query (select all data from the 'users' table).
        const chefid = req.query.chefid;
        const n=req.query.n;
        connection.query('SELECT R.dishid AS dishid, R.chefid AS chefid, R.reviewer as reviewer, R.rating as rating, R.comment AS comment, R.timestamp AS timestamp, D.name AS name FROM Review R JOIN Dish D ON R.dishid = D.dishid WHERE R.chefid = '+chefid+' AND R.comment IS NOT NULL ORDER BY R.timestamp DESC LIMIT '+n, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
        });
        connection.release();
    });
});



///////////////////
// DB Operations //
//////////////////

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
        const query = req.query.query;
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