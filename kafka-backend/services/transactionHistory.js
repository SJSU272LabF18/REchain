const request = require('request');

console.log(
  "---------------------INSIDE /SERVICES/BUYPROPERTY.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services transactionHistory.js handle request:" + JSON.stringify(msg)
  );

  //make request to hyperLedger fabric to fetch property transaction history
  uniqueID = msg.streetaddr + msg.unit + msg.zip
  propID = String(uniqueID).replace(/\s+/g, "")
  propID = propID.toLowerCase()
  console.log(propID)
  url="http://107.23.194.9:4000/api/org.digitalproperty.Property/" + propID //msg.propID
  request(url, { json: true }, (err, res, body) => {
    if(err) {
      console.log(
        "There was a problem in getting the transaction history from hyperledger."
      );
      console.log(err); 
      callback(null, []);
    } else if (res.statusCode == 200) {
      if (body != null && body.hasOwnProperty("transactionHistory")) {
        var transHistory = body["transactionHistory"].reverse();
        callback(null, JSON.stringify(transHistory, undefined, 2));
      } else 
        callback(null, []);
    } else if (res.statusCode == 404) {
      console.log(
        "Property does not exist"
      );
      callback(null, JSON.stringify({error : res.statusCode}, undefined, 2));
    } else {
        console.log(
          "Problem in getting the transaction history from hyperledger."
        );
        callback(null, []);
    }
  });

}

exports.handle_request = handle_request;
