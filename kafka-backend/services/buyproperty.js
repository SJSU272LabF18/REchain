var Properties = require("../../Backend/models/property");
const request = require('request');


require("../../Backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/BUYPROPERTY.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services buyproperty.js handle request:" + JSON.stringify(msg)
  );

  //Post request to Hyperledger Fabric to save new transaction on the specific property
  var today = new Date().toISOString().slice(0, 10);
  uniqueID = msg.streetaddr + msg.unit + msg.zip
  propID = String(uniqueID).replace(/\s+/g, "")
  propID = propID.toLowerCase()
  data ={
        "buyer": msg.fname + " " + msg.lname,
        "seller": msg.owner_fname + " " + msg.owner_lname,
        "trans_date": today,
        "trans_amt": msg.trans_amt,
        "property": propID 
  }

  console.log("HyperL bodyData=" + data)

  url="http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails"

  request.post({
        headers: {'content-type' : 'application/json'},
        url: url,
        body: data,
        json: true
         }, function(error, response, body){
            if(error){ 
              console.log(
                "There was a problem in saving the transaction history to hyperledger in buyproperty.js"
              );
              console.log(error); 
              callback(null, JSON.stringify(error));
            } else if (response.statusCode == 200) {
              
              //Delete entry from mongoDB 
              Properties.deleteOne({_id:msg.property_id}, function(err, obj) {
                if (err){
                  console.log(
                    "There was a problem in deleting the posting on MongoDB."
                  );
                  console.log(err); 
                  callback(null, []);
                } 
                console.log("1 document deleted");
                callback(null, JSON.stringify(data, undefined, 2))
              });
            } else {
              console.log(
                "There was a problem registering the transaction on the property"
              );
              callback(null, JSON.stringify({"Error" : "Error in buying property"}, undefined, 2));
            }

    });

  



}

exports.handle_request = handle_request;
