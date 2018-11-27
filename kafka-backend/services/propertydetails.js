var Properties = require("../../Backend/models/property");

require("../../Backend/db/mongoose");
var ObjectID = require("mongodb").ObjectId;

console.log(
  "---------------------INSIDE /SERVICES/PROPERTYDETAILS.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services propertydetails.js handle request:" + JSON.stringify(msg)
  );

  //property details logic

  Properties.findOne({
    _id: new ObjectID(msg.propnum_pk)
  }).then(
    docs => {
      console.log("Documents for property fetched from MongoDB: ");
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
