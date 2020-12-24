const Booking = require("../../models/booking");
const Pump = require("../../models/pump");
const util = require("../../common/utils");

//Function to create user and store details in database (sign up process)
exports.createBooking = function (req, res) {
  const { userId, pumpId } = req.body;

  let booking = new Booking({
    userId: userId,
    pumpId: pumpId,
  });
  booking.save(function (err) {
    if (err) {
      res.statusCode = 400;
      res.send({ err, status: 400 });
      return;
    }
    res.json({
      status: 200,
      message: `Booking with id :${booking._id} created successfully`,
    });
    res.end();
  });
};

exports.addPump = function (req, res) {
  util.validateRequiredKeys(
    req.body,
    [
      { key: "name", name: "name" },
      { key: "location", name: "latitude" },
    ],
    res,
    (error) => {
      if (!error) {
        console.log("req.body111", req.body);
        const pumpFindQuery = Pump.findOne({
          name: req.body.name,
        });
        pumpFindQuery.exec((err, user) => {
          if (user) {
            res.statusCode = 400;
            res.send({
              message: "Pump already registered",
              status: 404,
            });
            res.end();
            return;
          } else {
            // Function to get hashed password

            let pump = new Pump({
              name: req.body.name,
              location: req.body.location,
            });
            // Store hashed password and other details of user in database
            pump.save(function (err) {
              if (err) {
                res.statusCode = 400;
                res.send({ err, status: 400 });
                return;
              }
              res.json({
                status: 200,
                message: `pump with id :${pump._id} created successfully`,
              });
              res.end();
            });
          }
        });
      }
    }
  );
};

exports.getNearestPump = function (req, res) {
  const { userId, pumpId } = req.body;
  // Pump.createIndex({ point: "2dsphere" });
  Pump.find({ location: { $near: [20, 20] } })
    .limit(20)
    .then((res) => {
      console.log("PumpPump", res);
    });

  // Pump.aggregate([
  //   {
  //     $geoNear: {
  //       near: { type: "Point", coordinates: [28.411134, 77.331801] },
  //       distanceField: "distance",
  //       $maxDistance: 150000000,
  //       spherical: true,
  //     },
  //   },
  // ]).then((matches) => {
  //   console.log("matchesmatches", matches);
  // });
};
