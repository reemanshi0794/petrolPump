const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController/booking");
router.post("/addPump", bookingController.addPump);
router.post("/getNearestPump", bookingController.getNearestPump);

//export this router to use in our app.js
module.exports = router;
