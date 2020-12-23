const Booking = require("../../models/booking");

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
