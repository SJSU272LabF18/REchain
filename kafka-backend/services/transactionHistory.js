var Bookings = require("../../Backend/models/propertyHistory");
const request = require('request');


require("../../Backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/BUYPROPERTY.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services transactionHistory.js handle request:" + JSON.stringify(msg)
  );

  //make request to hyperLedger to fetch property history
  uniqueID = msg.streetaddr + msg.unit + msg.zip
  propID = String(uniqueID).replace(/\s+/g, "")
  console.log(propID)
  url="http://107.23.194.9:4000/api/org.digitalproperty.Property/" + propID //msg.propID
  request(url, { json: true }, (err, res, body) => {
    if (err) { 
      console.log(
        "There was a problem in getting the transaction history from hyperledger."
      );
      console.log(err); 
      callback(null, []);
    }
    //console.log(body[0]["transactionHistory"]);
    callback(null, JSON.stringify(body["transactionHistory"], undefined, 2));
  });

}

exports.handle_request = handle_request;
