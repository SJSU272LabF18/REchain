var Users = require("../../Backend/models/user");

require("../../Backend/db/mongoose");
var ObjectID = require("mongodb").ObjectId;

console.log("---------------------INSIDE /SERVICES/HOME.js------------------");
function handle_request(msg, callback) {
  console.log("In services home.js handle request:" + JSON.stringify(msg));

  //property details logic

  Users.findOne({
    email: msg.email
  }).then(
    docs => {
      console.log("Documents for HOME fetched from MongoDB: ");
      console.log(JSON.stringify(docs, undefined, 2));
      callback(null, JSON.stringify(docs, undefined, 2));
    },
    err => {
      console.log("Unable to fetch user. Try again.");
      callback(null, []);
    }
  );
}

exports.handle_request = handle_request;
