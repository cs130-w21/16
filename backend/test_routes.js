const express = require("express");
const app = express();

////////////////
// Test Query //
////////////////

app.get("/test", function(req, res) {
  const testJson = { dishid: 1, name: "Test Dish" };
  res.send(testJson);
  return;
});

module.exports = app;
