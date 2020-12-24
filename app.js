const express = require("express");
// app setup
const app = express();
const multer = require("multer");

var http = require("http").Server(app);
const userRoute = require("./routes/userRoute");
const bookingsRoute = require("./routes/bookingsRoute");

// initialize our express app
require("dotenv").config();

const bodyParser = require("body-parser");
require("./database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
app.use("/", userRoute);
app.use("/", bookingsRoute);

app.use(express.static(__dirname + "/public"));

let port = 6000;
http.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
// module.exports.storage = storage;
