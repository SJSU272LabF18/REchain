var Properties = require("../../Backend/models/property");
const request = require('request');
const today = new Date().toISOString().slice(0, 10);

require("../../Backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/BUYPROPERTY.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services buyproperty.js handle request:" + JSON.stringify(msg)
  );

  //Post request to Hyperledger to save new transaction
  propID = String(msg.streetaddr).replace(/\s+/g, "")
  bodyData ={
<<<<<<< HEAD
        "buyer":msg.fname + " " + msg.lname,
        "seller":msg.owner_fname + " " + msg.owner_lname,
        "trans_date":msg.trans_date,
        "trans_amt":msg.trans_amt,
=======
        "buyer":msg.fname,
        "seller":msg.owner_fname,
        "trans_date":today,
        "trans_amt":msg.price,
>>>>>>> 88e59a2f8eb731448a9865fbe3bd99cd1b0043b8
        "property":propID 
  }

  console.log("HyperL bodyData=" + bodyData)

  url="http://localhost:4000/api/org.digitalproperty.TransactionDetails"

  request.post({
        headers: {'content-type' : 'application/json'},
        url: url,
        body: bodyData,
        json: true
         }, function(error, response, body){
            if(error){ 
              console.log(
                "There was a problem in saving the transaction history to hyperledger in buyproperty.js"
              );
              console.log(error); 
              callback(null, JSON.stringify(error));
            }
            console.log(body);
            
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
              callback(null, JSON.stringify(bodyData, undefined, 2))
            });

    });

  



}

exports.handle_request = handle_request;
