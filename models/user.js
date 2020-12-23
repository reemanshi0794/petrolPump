const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

// user schema fields
let UserSchema = new Schema({
  firstname: { type: String, required: true, max: 100 }, // stores user firstname
  lastname: { type: String, required: true, max: 100 }, // stores user lastname
  email: { type: String, required: true, unique: true }, // stores user email
  password: { type: String, required: true }, // stores user password
  imageUrl: { type: String }, // stores user imageUrl
  latitude: { type: Number }, // stores user latitude
  longitude: { type: Number }, // stores user longitude
  isDeleted: { type: Boolean, default: false }, // stores user deleted bit whether user is deleted or not
  isBlocked: { type: Boolean, default: false }, // stores user deleted bit whether user is deleted or not
});

// Apply the uniqueValidator plugin to add unique constraints in this schema.
UserSchema.plugin(uniqueValidator);

// Export the model and  we need to create a model using it
module.exports = mongoose.model("users", UserSchema);
