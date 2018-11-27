var Users = require("../../Backend/models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;
require("../../Backend/db/mongoose");
const jwt = require("jsonwebtoken");

console.log(
  "---------------------INSIDE /SERVICES/OWNERLOGIN.js------------------"
);
function handle_request(msg, callback) {
  console.log("In services login.js handle request:" + JSON.stringify(msg));

  //login logic

  Users.findOne(
    {
      email: msg.email,
      typeofaccount: "owner"
    },
    function(err, result) {
      if (result) {
        console.log("RESULT: ", result.password);
        bcrypt.compare(msg.password, result.password, function(err, isMatch) {
          if (isMatch) {
            var payload = { email: result.email };
            jwt.sign(
              payload,
              "tasmanianDevil",
              { expiresIn: 600000 },
              (err, token) => {
                const newToken = "Bearer " + token;
                console.log("token=", newToken);
                console.log("SIGN error", err);
                callback(null, newToken);
              }
            );
          } else {
            console.log("Password is incorrect");
            callback(err, "Password is incorrect!!");
          }
        });
      } else {
        callback(err, "User doesn't exist!!");
      }
    }
  );
}

exports.handle_request = handle_request;
