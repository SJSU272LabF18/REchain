var mongoose = require("mongoose");

module.exports = mongoose.model(
  "property_details",
  {
    email: {
      type: String
    },
    streetaddr: {
      type: String
    },
    country: {
      type: String
    },
    unit: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    },
    headline: {
      type: String
    },
    propdesc: {
      type: String
    },
    proptype: {
      type: String
    },
    rooms: {
      type: Number
    },
    accomodates: {
      type: Number
    },
    bathrooms: {
      type: Number
    },
    startdate: {
      type: Date
    },
    enddate: {
      type: Date
    },
    nbr: {
      type: Number
    },
    minstay: {
      type: Number
    },
    cf: {
      type: Number
    },
    apa: {
      type: String
    },
    isbooked: {
      type: String
    },
    photos: {
      type: Array
    },
    owner_fname: {
      type: String
    },
    owner_lname: {
      type: String
    },
    yearBuilt: {
      type: String
    },
    parkingSpots: {
      type: String
    },
    price: {
      type: String
    },
    sqft: {
      type: String
    }
  },
  "property_details"
);
