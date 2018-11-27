var Users = require("../../Backend/models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;
require("../../Backend/db/mongoose");
const jwt = require("jsonwebtoken");

console.log(
  "---------------------INSIDE /SERVICES/SIGNUP.js------------------"
);
function handle_request(msg, callback) {
  console.log("In services signup.js handle request:" + JSON.stringify(msg));

  //signup logic
  var hash = bcrypt.hashSync(msg.password, 10);

  var user_new = new Users({
    fname: msg.fname,
    lname: msg.lname,
    email: msg.email,
    password: hash,
    abt: "",
    city_cntry: "",
    company: "",
    school: "",
    hometown: "",
    languages: "",
    gender: "",
    phone: "",
    photoname: "",
    typeofaccount: msg.typeofaccount
  });
  Users.findOne(
    {
      email: msg.email,
      typeofaccount: msg.typeofaccount
    },
    function(err, result) {
      if (result) {
        callback(
          null,
          "The email associated already has an account. Please try again!"
        );
      } else {
        //"User doesn't exist!!";
        user_new.save().then(
          user_new => {
            console.log("User created : ", user_new);
            callback(null, user_new);
          },
          err => {
            console.log("Error creating user.");
            callback(null, []);
          }
        );
      }
    }
  );
}

exports.handle_request = handle_request;
