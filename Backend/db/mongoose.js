var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://neil:sjsu1234@ds035907.mlab.com:35907/bloquity")
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("could not connect to mongodb:"));
module.exports = { mongoose };
