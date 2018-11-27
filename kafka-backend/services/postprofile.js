var Users = require("../../Backend/models/user");

require("../../Backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/POSTPROFILE.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services postprofile.js handle request:" + JSON.stringify(msg)
  );

  //profile post logic
  Users.findOneAndUpdate(
    {
      email: msg.email
    },
    {
      $set: {
        fname: msg.fname,
        lname: msg.lname,
        abt: msg.abt,
        city_cntry: msg.city_cntry,
        company: msg.company,
        school: msg.school,
        hometown: msg.hometown,
        languages: msg.languages,
        gender: msg.gender,
        phone: msg.phone
      }
    },
    { returnOriginal: false }
  ).then(
    user => {
      console.log("Profile photo updated", user);
      callback(null, user);
    },
    err => {
      console.log("Unable to update photo");
      callback(null, []);
    }
  );
}

exports.handle_request = handle_request;
