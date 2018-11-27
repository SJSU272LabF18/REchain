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
  
  url="http://localhost:4000/api/org.digitalproperty.Property/" + msg.streetaddr.replace(/\s+/, "") //msg.propID
  request(url, { json: true }, (err, res, body) => {
    if (err) { 
      console.log(
        "There was a problem in getting the transaction history from hyperledger."
      );
      console.log(err); 
      callback(null, []);
    }
    //console.log(body[0]["transactionHistory"]);
    callback(null, JSON.stringify(body, undefined, 2));
  });

}

exports.handle_request = handle_request;
