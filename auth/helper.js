const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
  isAuthenticated: async (req, res, next) => {
    const token = req.headers.authorization || "";
    console.log("isAuthenticated token", token);
    const secretKey = process.env.API_KEY;

    await jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        console.log("errerr");
        return res.status(401).json({
          success: false,
          message: err,
        });
      } else {
        console.log("decoded data", decoded);
        if (decoded && decoded.id) {
          await User.findOne({ _id: decoded.id })
            .select({ _id: 1 })
            .then((user) => {
              console.log("userrrr", user);
              req.user = user;
              next();
            })
            .catch((err) => {
              res.status(401).json({ message: err });
            });
        } else if (decoded && decoded.email) {
          await User.findOne({ email: decoded.email })
            .select({ _id: 1 })
            .then((user) => {
              console.log("userrrr", user);
              req.user = user;
              next();
            })
            .catch((err) => {
              res.status(401).json({ message: err });
            });
        }
      }
    });
  },
};
