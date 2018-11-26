var mongoose = require("mongoose");

module.exports = mongoose.model(
  "property_history",
  {
    streetaddr: {
      type: String
    },
    transactDate: {
      type: Date
    },
    buyer: {
      type: String
    },
    seller: {
      type: String
    },
    transactAmount: {
      type: Number
    }
  },
  "property_history"
);
