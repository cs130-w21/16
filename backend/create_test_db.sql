CREATE TABLE Chef(chefid INT, name VARCHAR(100), bio TEXT, shortDesc VARCHAR(50), profilePic BLOB, location BLOB, rating FLOAT, numReviews INT);
CREATE TABLE Dish(dishid INT, chefid INT, name VARCHAR(100), price FLOAT, description TEXT, shortDesc VARCHAR(100), ingredients TEXT, timeMin INT, images BLOB, rating FLOAT, numReviews INT);
CREATE TABLE Review(dishid INT, chefid INT, reviewer VARCHAR(100), rating INT, comment TEXT, timestamp DATETIME);
CREATE TABLE Orders(orderid INT, customer VARCHAR(100), dishid INT, chefid INT, placed DATETIME);
LOAD DATA LOCAL INFILE './fake_data/chef.csv' INTO TABLE Chef FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"';
