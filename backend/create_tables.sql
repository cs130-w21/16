CREATE TABLE Chef(chefid INT PRIMARY KEY, name VARCHAR(100), bio TEXT, shortDesc VARCHAR(50), location BLOB, rating FLOAT, numReviews INT, profilePic TEXT);
CREATE TABLE Dish(dishid INT PRIMARY KEY, chefid INT, name VARCHAR(100), price FLOAT, description TEXT, shortDesc VARCHAR(100), ingredients TEXT, timeMin INT, rating FLOAT, numReviews INT, images TEXT);
CREATE TABLE Review(dishid INT PRIMARY KEY, chefid INT, reviewer VARCHAR(100) PRIMARY KEY, rating INT, comment TEXT, timestamp DATETIME PRIMARY KEY);
CREATE TABLE Orders(orderid INT PRIMARY KEY, customer VARCHAR(100), dishid INT, chefid INT, placed DATETIME);
