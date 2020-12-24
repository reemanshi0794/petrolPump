const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

// user schema fields
let BookingSchema = new Schema({
  type: { type: String, required: true, max: 100 }, // stores user firstname
  // createdAt: { type: Date, required: true, default: Date.now }, // stores date and time of message

  pump: {
    type: Schema.Types.ObjectId,
    ref: "pump",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

// Apply the uniqueValidator plugin to add unique constraints in this schema.
BookingSchema.plugin(uniqueValidator);

// Export the model and  we need to create a model using it
module.exports = mongoose.model("bookings", BookingSchema);
