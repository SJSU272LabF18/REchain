var Properties = require("../../Backend/models/property");

require("../../Backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/SEARCHRESULTS.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services searchresults.js handle request:" + JSON.stringify(msg)
  );

  //search results logic
  // var date1 = new Date(msg.startdate);
  // var date2 = new Date(msg.enddate);
  // const timeDiff = Math.abs(date2.getDate() - date1.getDate());
  // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  Properties.find({
    // enddate: { $gte: new Date(msg.enddate) },
    // accomodates: { $gte: parseInt(msg.guests) },
    // startdate: { $lte: new Date(msg.startdate) },

    // minstay: { $lte: diffDays },
    // $or: [
    //   { country: String(msg.where).toLowerCase() },
    //   { city: String(msg.where).toLowerCase() },
    //   { state: String(msg.where).toLowerCase() }
    // ]

    $or: [
      //{ country: String(msg.country).toLowerCase()},
      { zip: String(msg.zip) },
      { city: String(msg.city).toLowerCase() },
      { state: String(msg.state).toLowerCase()}
    ]
  }).then(
    docs => {
      console.log("Documents for search fetched from MongoDB: ");
      console.log(JSON.stringify(docs, undefined, 2));
      callback(null, JSON.stringify(docs, undefined, 2));
    },
    err => {
      console.log(
        "There was a problem in getting the property details. Please try again."
      );
      callback(null, []);
    }
  );
}

exports.handle_request = handle_request;
