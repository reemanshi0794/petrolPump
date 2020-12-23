const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController/booking");
// routes of chatapp
router.post("/signUp", userController.userCreate);
router.post("/login", userController.userLogin);

//export this router to use in our app.js
module.exports = router;
