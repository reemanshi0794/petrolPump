// Bring Mongoose into the app
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://admin:admin@cluster0.d4xtn.mongodb.net/petrolPump?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("Database connected!!");
  })
  .catch((err) => {
    console.log("err", err);
  });
