/**
 * Express server application providing routes/access to the mysql database
 * @module routes
 * @requires express
 * @requires bodyParser
 * @requires mysql
 * @requires twilio
 * @requires secrets
 */

/**
 * secrets module containing database passwords, authTokens, ids and other secrets
 * @const
 */
const secrets = require("./secrets");

/**
 * express module
 * @const
 */
const express = require("express");

/**
 * body-parser module
 * @const
 */
const bodyParser = require("body-parser");

/**
 * mysql module
 * @const
 */
const mysql = require("mysql");

/**
 * mysql connection to our database
 * @const
 */
const connection = mysql.createPool({
  host: "potluck.c6o4e5jzyjzo.us-east-2.rds.amazonaws.com",
  database: "Potluck",
  user: "admin",
  password: secrets.dbpw()
});

/**
 * twilio instance
 * @const
 */
const client = require("twilio")(secrets.accountSid(), secrets.authToken());

// Starting our app.
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////////////
// DISHES //
///////////

/**
 * Route to return all dish entries in the dish table
 * @name get/AllDishes
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/AllDishes", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query("SELECT * FROM Dish", function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        console.log(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
    connection.release();
  });
});

/**
 * Route to return all currently available dish entries in the dish table
 * @name get/AvailableDishes
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/AvailableDishes", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query("SELECT * FROM Dish WHERE available ORDER BY FLOOR(rating*2.0)/2.0 DESC, numReviews DESC", function(
      error,
      results,
      fields
    ) {
      // If some error occurs, we throw an error.
      if (error) {
        console.log(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
    connection.release();
  });
});

/**
 * Route to return dih information for a specific dish
 * @name get/DishInfo
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/DishInfo", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const dishid = req.query.dishid;
    connection.query(
      "SELECT dishid, C.chefid AS chefid, D.name AS name, price, description, D.shortDesc AS shortDesc, ingredients, timeMin, D.rating as rating, D.numReviews as numReviews, primaryImage, secondImage, thirdImage, fourthImage, available, C.name as chefName FROM Dish D JOIN Chef C on D.chefid = C.chefid WHERE dishid =" +
        dishid,
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

/**
 * Route to return all dish primary images for a specified chef ordered by dish rating
 * @name get/CoverPhotos
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/CoverPhotos", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const chefid = req.query.id;
    connection.query(
      "SELECT primaryImage FROM Dish WHERE chefid = " +
        chefid +
        " ORDER BY rating DESC",
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

/**
 * Route to return all dish entries for a given chef
 * @name get/ChefsDishes
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/ChefsDishes", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const chefid = req.query.id;
    connection.query(
      "SELECT * FROM Dish WHERE chefid = " +
        chefid +
        " ORDER BY available DESC, rating DESC",
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

///////////
// CHEFS //
//////////

/**
 * Route to return all chef entries in the chef table
 * @name get/Chefs
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/Chefs", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query("SELECT * FROM Chef", function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        console.log(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
    connection.release();
  });
});

/**
 * Route to return the table entry for a specified chef
 * @name get/ChefInfo
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/ChefInfo", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const chefid = req.query.id;
    connection.query("SELECT * FROM Chef WHERE chefid = " + chefid, function(
      error,
      results,
      fields
    ) {
      // If some error occurs, we throw an error.
      if (error) {
        console.log(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
    connection.release();
  });
});

/////////////
// Reviews //
/////////////

/**
 * Route to run insert query to add a new review to Review table
 * @name get/newReview
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/newReview", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const dishid = req.query.dishid;
    const chefid = req.query.chefid;
    const reviewer = req.query.reviewer;
    const rating = req.query.rating;
    const comment =
      req.query.comment != null ? '"' + req.query.comment + '"' : "null";
    const timestamp = req.query.timestamp;
    connection.query(
      "INSERT INTO Review VALUES (" +
        dishid +
        "," +
        chefid +
        ',"' +
        reviewer +
        '",' +
        rating +
        "," +
        comment +
        ',"' +
        timestamp +
        '")',
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

/**
 * Route to update query to update rating and numReviews for specific dish in Dish table
 * @name get/updateDishWithNewReview
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/updateDishWithNewReview", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const dishid = req.query.dishid;
    const rating = req.query.rating;
    connection.query(
      "UPDATE Dish SET rating = (numReviews*rating+" +
        rating +
        ")/(numReviews+1), numReviews = numReviews+1 WHERE dishid=" +
        dishid,
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

/**
 * Route to update query to update rating and numReviews for specific chef in Chef table
 * @name get/updateChefWithNewReview
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/updateChefWithNewReview", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const chefid = req.query.chefid;
    const rating = req.query.rating;
    connection.query(
      "UPDATE Chef SET rating = (numReviews*rating+" +
        rating +
        ")/(numReviews+1), numReviews = numReviews+1 WHERE chefid=" +
        chefid,
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

/**
 * Route to return all reviews in Review table
 * @name get/AllReviews
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/AllReviews", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query("SELECT * FROM Review;", function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        console.log(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
    connection.release();
  });
});

/**
 * Route to return all reviews for a given dish
 * @name get/getDishReviews
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/getDishReviews", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const dishid = req.query.dishid;
    connection.query(
      "SELECT * FROM Review WHERE dishid = " +
        dishid +
        " AND comment IS NOT NULL ORDER BY timestamp DESC",
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

/**
 * Route to return all reviews for a given chef
 * @name get/getChefReviews
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/getChefReviews", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const chefid = req.query.chefid;
    connection.query(
      "SELECT R.dishid AS dishid, R.chefid AS chefid, R.reviewer as reviewer, R.rating as rating, R.comment AS comment, R.timestamp AS timestamp, D.name AS name FROM Review R JOIN Dish D ON R.dishid = D.dishid WHERE R.chefid = " +
        chefid +
        " AND R.comment IS NOT NULL ORDER BY R.timestamp DESC",
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

/**
 * Route to return the most recent N reviews for a given dish
 * @name get/getNDishReviews
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/getNDishReviews", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const dishid = req.query.dishid;
    const n = req.query.n;
    connection.query(
      "SELECT * FROM Review WHERE dishid = " +
        dishid +
        " AND comment IS NOT NULL ORDER BY timestamp DESC LIMIT " +
        n,
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

/**
 * Route to return the most recent N reviews for a given chef
 * @name get/getNChefReviews
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/getNChefReviews", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const chefid = req.query.chefid;
    const n = req.query.n;
    connection.query(
      "SELECT R.dishid AS dishid, R.chefid AS chefid, R.reviewer as reviewer, R.rating as rating, R.comment AS comment, R.timestamp AS timestamp, D.name AS name FROM Review R JOIN Dish D ON R.dishid = D.dishid WHERE R.chefid = " +
        chefid +
        " AND R.comment IS NOT NULL ORDER BY R.timestamp DESC LIMIT " +
        n,
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

///////////////////
// DB Operations //
//////////////////

/**
 * Route to run create database query to initialize Potluck database
 * @name get/CreateDB
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/CreateDB", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const chefid = req.query.id;
    connection.query("CREATE DATABASE IF NOT EXISTS Potluck;", function(
      error,
      results,
      fields
    ) {
      // If some error occurs, we throw an error.
      if (error) {
        console.log(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
    connection.release();
  });
});

/**
 * Route to run create table queries from create_tables.sql to create all relevant tables
 * @name get/CreateTables
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/CreateTables", function(req, res) {
  var fs = require("fs");
  var queries = fs.readFileSync("./create_tables.sql", "utf8").split("\n");
  var results_arr = [];
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    queries.forEach(query => {
      connection.query(query, function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          console.log(error);
        }

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        results_arr.push(results);
      });
    });
    res.send(results_arr);
    connection.release();
  });
});

/**
 * Route to run show tables query
 * @name get/ShowTables
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/ShowTables", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query("SHOW TABLES;", function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        console.log(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
    connection.release();
  });
});

app.get("/query", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    const query = req.query.query;
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        console.log(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
    connection.release();
  });
});

/**
 * Route to run insert values query to insert dummy chef data from local csv's
 * @name get/insertChefs
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/insertChefs", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    var query =
      "INSERT INTO Chef(chefid, name, bio, shortDesc, location, rating, numReviews, profilePic) VALUES ";
    var fs = require("fs");
    var rows = fs.readFileSync("./fake_data/chef.csv", "utf8").split("\r\n");
    var results_arr = [];
    //query = query + "(" + rows[0] + "), ";

    rows.forEach((row, index) => {
      if (index != 0) {
        var entry = "(" + row + "), ";
        query = query + entry;
      }
    });

    query = query.substring(0, query.length - 2) + ";";
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        console.log(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      results_arr.push(results);
    });
    res.send("No Errors");
    connection.release();
  });
});

/**
 * Route to run insert values query to insert dummy dish data from local csv's
 * @name get/insertDishes
 * @function
 * @memberof module:routes
 * @inner
 */
app.get("/insertDishes", function(req, res) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    // Executing the MySQL query (select all data from the 'users' table).
    var query = "INSERT INTO Dish VALUES ";
    var fs = require("fs");
    var rows = fs.readFileSync("./fake_data/dish.csv", "utf8").split("\r\n");
    var results_arr = [];

    rows.forEach((row, index) => {
      if (index != 0) {
        var entry = "(" + row + "), ";
        query = query + entry;
      }
    });

    query = query.substring(0, query.length - 2) + ";";
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        console.log(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      results_arr.push(results);
    });
    res.send(results_arr);
    connection.release();
  });
});

///////////////////////
// Send Text Message //
///////////////////////

/**
 * Route to run post request to send texts to chefs
 * @name post/textChef
 * @function
 * @memberof module:routes
 * @inner
 */
app.post("/textChef", function(req, res) {
  client.messages
    .create({
      body:
        "An order has been submitted! \nFor dish(es): " +
        req.query.dishes +
        "\nSpecial Instructions: " +
        req.query.instructions +
        "\nPaying via: " +
        req.query.method,
      from: secrets.phone("sender"),
      to: req.query.phone
    })
    .then(function(message) {
      console.log(message.sid);
      res.send("Message inbound with custom message");
    })
    .catch(err => "error with: " + err);
});

// Starting our server.
var args = process.argv.slice(2);
var port;
if (args.length == 0) {
  port = 8888;
} else {
  port = parseInt(args[0]);
}
app.listen(port, () => {
  console.log(
    "Go to http://3.141.20.190:" +
      port.toString() +
      "/AllDishes so you can see the data."
  );
  // Use fetch('http://<ip where db is hosted or localhost>:3000/Chefs') to fetch
});
