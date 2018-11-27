var Bookings = require("../../Backend/models/booking");

require("../../Backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/BOOKPROPERTY.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services bookproperty.js handle request:" + JSON.stringify(msg)
  );

  //booking logic

  var booking_new = new Bookings({
    owner_email: msg.owner_email,
    traveler_email: msg.email,
    startdate: msg.startdate,
    enddate: msg.enddate,
    guests: msg.guests,
    total: msg.total,
    city: msg.city,
    state: msg.state,
    country: msg.country,
    headline: msg.headline,
    traveler_fname: msg.fname,
    traveler_lname: msg.lname
  });

  booking_new.save().then(
    booking_new => {
      console.log("User created : ", booking_new);
      callback(null, booking_new);
    },
    err => {
      console.log("Error Creating Booking");
      callback(null, []);
    }
  );
}

exports.handle_request = handle_request;
