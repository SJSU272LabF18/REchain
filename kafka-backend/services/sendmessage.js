var Messages = require("../../Backend/models/messages");

require("../../Backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/SENDMESSAGE.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services sendmessage.js handle request:" + JSON.stringify(msg)
  );

  //message logic

  var new_message = new Messages({
    to_email: msg.to_email,
    to_fname: msg.to_fname,
    to_lname: msg.to_lname,
    from_email: msg.from_email,
    from_fname: msg.from_fname,
    from_lname: msg.from_lname,
    message: msg.message,
    time: new Date()
  });

  new_message.save().then(
    new_message => {
      console.log("User created : ", new_message);
      callback(null, new_message);
    },
    err => {
      console.log("Error creating user.");
      callback(null, []);
    }
  );
}

exports.handle_request = handle_request;
