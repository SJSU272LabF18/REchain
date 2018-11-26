var Messages = require("../../Backend/models/messages");

require("../../Backend/db/mongoose");
var ObjectID = require("mongodb").ObjectId;

console.log("---------------------INSIDE /SERVICES/INBOX.js------------------");
function handle_request(msg, callback) {
  console.log("In services inbox.js handle request:" + JSON.stringify(msg));

  //Inbox logic
  Messages.find({
    $or: [{ to_email: msg.email }, { from_email: msg.email }]
  }).then(
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

exports.handle_request = handle_request;
