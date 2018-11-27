var Properties = require("../../Backend/models/property");
const request = require('request');
const today = new Date().toISOString().slice(0, 10);

require("../../Backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/lyp.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services lyp.js handle request:" + JSON.stringify(msg)
  );

  //lyp post logic

  var property = new Properties({
    email: msg.email,
    streetaddr: msg.streetaddr,
    country: String(msg.country).toLowerCase(),
    unit: msg.unit,
    city: String(msg.city).toLowerCase(),
    state: String(msg.state).toLowerCase(),
    zip: msg.zip,
    headline: msg.headline,
    propdesc: msg.propdesc,
    proptype: msg.proptype,
    rooms: parseInt(msg.rooms, 10),
    //accomodates: parseInt(msg.accomodates, 10),
    bathrooms: parseInt(msg.bathrooms, 10),
    //startdate: new Date(msg.startdate),
    //enddate: new Date(msg.enddate),
    //nbr: msg.nbr,
    //minstay: parseInt(msg.minstay, 10),
    //cf: msg.cf,
    //apa: msg.apa,
    //isbooked: "N",
    photos: [],
    owner_fname: msg.fname,
    owner_lname: msg.lname,
    yearbuilt: msg.yearbuilt,
    parking: msg.parking,
    price: String(msg.price),
    sqft: String(msg.sqft)
  });

  console.log("************************HYPERLEDGER*****************************")
  console.log("Making request to HYPERLEDGER to chk if asset exists")
  propID = String(msg.streetaddr).replace(/\s+/g, "")

  url="http://localhost:4000/api/org.digitalproperty.Property/" + propID
  request(url, { json: true }, (err, res, body) => {
    if (err) { 
      console.log(
        "There was a problem in getting the transaction history from hyperledger."
      );
      console.log(err); 
      callback(null, []);
    }
     
    if(res.statusCode==404){
      console.log("Property Asset " + propID + " does not exist in Hyperledger.");

      console.log("Creating new asset for property " + propID); 

      //create new asset on hyperledger
      bodyData={
        "propertyId": propID,
        "transactionHistory": []
      }

      url="http://localhost:4000/api/org.digitalproperty.Property"

      request.post({
            headers: {'content-type' : 'application/json'},
            url: url,
            body: bodyData,
            json: true
            }, function(error, response, body){
                if(error){ 
                  console.log(
                    "There was a problem in creating new asset in hyperledger in lyp.js"
                  );
                  console.log(error); 
                  callback(null, []);
                }
                console.log("Property asset created.")
                console.log("********************************************************")
                console.log("Posting transaction for property ",propID)
                transaction= {
                  "buyer":msg.fname + " " + msg.lname,
                  "seller":"builder",
                  "trans_date":"01/01/"+msg.yearbuilt,
                  "trans_amt":"undisclosed",
                  "property":propID
                }
                console.log("Transaction: " + JSON.stringify(transaction))
                url="http://localhost:4000/api/org.digitalproperty.TransactionDetails"

                request.post({
                    headers: {'content-type' : 'application/json'},
                    url: url,
                    body: transaction,
                    json: true
                    }, function(error, response, body){
                        if(error){ 
                          console.log(
                            "There was a problem in saving the transaction history to hyperledger in lyp.js"
                          );
                          console.log(error); 
                          callback(null, []);
                        }
                        //console.log(body);
                        console.log("Posting transaction completed.")
                        console.log("****************************************")
                        property.save().then(
                          property => {
                            console.log("Property saved to DB : ", property._id);
                            callback(null, JSON.stringify({ _id: property._id }));
                          },
                          err => {
                            console.log("Error saving property to DB", err);
                            callback(null, []);
                          }
                        );
                  });

      });

      
    } else {
      console.log("Property Exists, Checking if owners match")

      var currentOwnerIndex=(res.body.transactionHistory).length -1
      var currentOwner = res.body.transactionHistory[currentOwnerIndex].buyer
      //console.log("Buyer=", res.body.transactionHistory[currentOwnerIndex].buyer)
      var postOwner=msg.fname + " " + msg.lname
      if(currentOwner.toLowerCase()!=postOwner.toLowerCase()){
        console.log("Owners dont match")
        callback(null, JSON.stringify({"error":"Property Owners do not match. Cannot post property."}));

      } else {
        console.log("Owners match!")
        console.log("************************HYPERLEDGER*****************************")
        
        property.save().then(
          property => {
            console.log("Property saved to DB : ", property._id);
            callback(null, JSON.stringify({ _id: property._id }));
          },
          err => {
            console.log("Error saving property to DB", err);
            callback(null, []);
          }
        );
      }

    }
  });

}

exports.handle_request = handle_request;
