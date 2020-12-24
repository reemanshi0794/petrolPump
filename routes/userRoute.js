const express = require("express");
const router = express.Router();
const auth = require("../auth/helper");

const userController = require("../controllers/userController/authentication");
// routes of petrolpump app
router.post("/signUp", userController.userCreate);
router.post("/login", auth.isAuthenticated, userController.userLogin);
router.post("/upload", userController.uploadFile);
//export this router to use in our app.js
module.exports = router;
