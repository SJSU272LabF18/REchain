var mongoose = require("mongoose");

module.exports = mongoose.model(
  "traveler_signup",
  {
    fname: {
      type: String
    },
    lname: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    abt: {
      type: String
    },
    city_cntry: {
      type: String
    },
    company: {
      type: String
    },
    school: {
      type: String
    },
    hometown: {
      type: String
    },
    languages: {
      type: String
    },
    gender: {
      type: String
    },
    phone: {
      type: Number
    },
    photoname: {
      type: String
    },
    typeofaccount: {
      type: String
    }
  },
  "traveler_signup"
);

// module.exports = { Users };
