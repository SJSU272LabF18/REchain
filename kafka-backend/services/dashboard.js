var Bookings = require("../../Backend/models/booking");

require("../../Backend/db/mongoose");
var ObjectID = require("mongodb").ObjectId;

console.log(
  "---------------------INSIDE /SERVICES/DASHBOARD.js------------------"
);
function handle_request(msg, callback) {
  console.log("In services dashboard.js handle request:" + JSON.stringify(msg));

  //property details logic

  if (msg.typeofaccount == "traveler") {
    // city,state,country,headline,startdate,enddate,cost
    Bookings.find(
      {
        traveler_email: msg.email
      },
      {
        city: 1,
        state: 1,
        country: 1,
        headline: 1,
        startdate: 1,
        enddate: 1,
        total: 1
      }
    ).then(
      docs => {
        if (docs != null) {
          console.log("Documents for booking fetched from MongoDB: ");
          console.log(JSON.stringify(docs, undefined, 2));
          callback(null, JSON.stringify(docs, undefined, 2));
        }
      },
      err => {
        console.log(
          "There was a problem in getting the property details. Please try again."
        );
        callback(null, []);
      }
    );
  } else if (msg.typeofaccount == "owner") {
    // headline,startdate,enddate,cost,traveler_fname,traveler_lname
    Bookings.find(
      {
        owner_email: msg.email
      },
      {
        city: 1,
        state: 1,
        country: 1,
        headline: 1,
        startdate: 1,
        enddate: 1,
        total: 1,
        traveler_fname: 1,
        traveler_lname: 1
      }
    ).then(
      docs => {
        if (docs != null) {
          console.log("Documents for booking fetched from MongoDB: ");
          console.log(JSON.stringify(docs, undefined, 2));
          callback(null, JSON.stringify(docs, undefined, 2));
        }
      },
      err => {
        console.log(
          "There was a problem in getting the property details. Please try again."
        );
        callback(null, []);
      }
    );
  }
}

exports.handle_request = handle_request;
