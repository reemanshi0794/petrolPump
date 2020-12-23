const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

// user schema fields
let PumpSchema = new Schema({
  name: { type: String, required: true, max: 100 }, // stores user firstname
  latitude: { type: Number }, // stores pump latitude
  longitude: { type: Number }, // stores pump longitude
});

// Apply the uniqueValidator plugin to add unique constraints in this schema.
PumpSchema.plugin(uniqueValidator);

// Export the model and  we need to create a model using it
module.exports = mongoose.model("pumps", PumpSchema);
