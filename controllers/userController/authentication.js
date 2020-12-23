const User = require("../../models/user");
const util = require("../../common/utils");
const bcrypt = require("bcrypt");

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
              if (hash) {
                let user = new User({
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  email: req.body.email.toLowerCase(),
                  password: hash,
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
