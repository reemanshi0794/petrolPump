const User = require("../../models/user");
const util = require("../../common/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecretkey = process.env.API_KEY;
const multer = require("multer");
const app = require("../../app");

//Function to create user and store details in database (sign up process)
exports.userCreate = function (req, res) {
  util.validateRequiredKeys(
    req.body,
    [
      { key: "firstname", name: "First name" },
      { key: "lastname", name: "Last name" },
      { key: "email", name: "Email" },
      { key: "password", name: "Password" },
    ],
    res,
    (error) => {
      if (!error) {
        const userFindQuery = User.findOne({
          email: req.body.email,
        });
        userFindQuery.exec((err, user) => {
          if (user) {
            res.statusCode = 400;
            res.send({
              message: "Email already registered",
              status: 404,
            });
            res.end();
            return;
          } else {
            // Function to get hashed password
            bcrypt.hash(req.body.password, 10, function (err, hash) {
              console.log("KEEEEEY", process.env.API_KEY);
              const payload = {
                email: req.body.email,
                name: req.body.firstname,
              }; // create JWT payload
              console.log("process.env", process.env);
              const jwtsecretkey = process.env.API_KEY;

              console.log("jwtsecretkeyjwtsecretkey", jwtsecretkey);
              var token = jwt.sign(payload, jwtsecretkey, { expiresIn: "7d" });
              if (hash) {
                let user = new User({
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  email: req.body.email.toLowerCase(),
                  password: hash,
                  token: token,
                });
                // Store hashed password and other details of user in database
                user.save(function (err) {
                  if (err) {
                    res.statusCode = 400;
                    res.send({ err, status: 400 });
                    return;
                  }
                  res.json({
                    status: 200,
                    message: `User with id :${user._id} created successfully`,
                  });
                  res.end();
                });
              }
            });
          }
        });
      }
    }
  );
};

// Function to check user details(email, password) from database if matched or not for login process
exports.userLogin = function (req, res) {
  util.validateRequiredKeys(
    req.body,
    [
      { key: "email", name: "Email" },
      { key: "password", name: "Password" },
    ],
    res,
    (error) => {
      if (!error) {
        const userFindQuery = User.findOne({
          email: req.body.email.toLowerCase(),
        }).select({
          firstname: 1,
          lastname: 1,
          id: 1,
          email: 1,
          password: 1,
          latitude: 1,
          longitude: 1,
        });
        userFindQuery.exec((err, user) => {
          if (user) {
            const hash = user.password;
            const userObj = {
              _id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              latitude: user.latitude,
              longitude: user.longitude,
            };
            res.json({
              status: 200,
              user: userObj,
            });
            res.end();
          } else {
            console.log(err, "err");
            res.statusCode = 400;
            res.json({
              status: 404,
              message: "User does not exists",
            });
            res.end();
          }
        });
      }
    }
  );
};
exports.uploadFile = function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log("reqreq", req.body);
  console.log("reqreq", req.file);
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/uploads");
    },
    limits: { fileSize: 3 * 1024 * 1024 }, //3mb

    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now());
    },
  });
  // 'profile_pic' is the name of our file input field in the HTML form
  let upload = multer({
    dest: "uploads/",
    storage: storage,
    fileFilter: function (req, file, cb) {
      console.log("file is", file);
      cb(null, true);
    },
  }).single("image");

  upload(req, res, function (err) {
    console.log("reqreqfilefile", req.file, err);
    const files = req.files;
    console.log("filesfiles", files);

    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (req.file.size > 3000000) {
      return res.send("Please select an image less than 3 mb");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`
    );
  });
};
