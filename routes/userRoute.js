const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController/authentication");
// routes of chatapp
router.post("/signUp", userController.userCreate);
router.post("/login", userController.userLogin);

//export this router to use in our app.js
module.exports = router;
