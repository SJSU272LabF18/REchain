var mongoose = require("mongoose");

module.exports = mongoose.model(
  "messages",
  {
    to_email: {
      type: String
    },
    from_email: {
      type: String
    },
    to_fname: {
      type: String
    },
    to_lname: {
      type: String
    },
    from_fname: {
      type: String
    },
    from_lname: {
      type: String
    },
    message: {
      type: String
    },
    time: {
      type: Date
    }
  },
  "messages"
);
