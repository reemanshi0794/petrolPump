const express = require("express");
// app setup
const app = express();

var http = require("http").Server(app);
const userRoute = require("./routes/userRoute");
// initialize our express app

const bodyParser = require("body-parser");
require("./database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let port = 6000;
http.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
