var mongoose = require("mongoose");

module.exports = mongoose.model(
  "bookings",
  {
    owner_email: {
      type: String
    },
    traveler_email: {
      type: String
    },
    startdate: {
      type: String
    },
    enddate: {
      type: String
    },
    guests: {
      type: String
    },
    total: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    headline: {
      type: String
    },
    traveler_fname: {
      type: String
    },
    traveler_lname: {
      type: String
    }
  },
  "bookings"
);
