//import the require dependencies
var express = require("express");
require("./config/passport");

var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cors = require("cors");
app.set("view engine", "ejs");
var _ = require("lodash");
var passport = require("passport");

var login = require("./routes/login.js");
var ownerLogin = require("./routes/ownerLogin.js");
var signUp = require("./routes/signUp.js");
var home = require("./routes/home.js");
var dashboard = require("./routes/dashboard.js");
var photos = require("./routes/photos.js");
var profile = require("./routes/profile.js");
var inbox = require("./routes/inbox.js");
var lyp = require("./routes/lyp.js");
var bookproperty = require("./routes/bookproperty.js");
var transactionHistory = require("./routes/transactionHistory.js");
var buyproperty = require("./routes/buyproperty.js");

app.use(passport.initialize());
app.use(passport.session());

var requireAuth = passport.authenticate("jwt", { session: false });
//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use("/login", login);
app.use("/ownerLogin", ownerLogin);
app.use("/SignUp", signUp);
app.use("/home", home);
app.use("/dashboard", dashboard);
app.use("/photos", photos);
app.use(
  "/profile",
  //passport.authenticate("jwt", { session: false }),
  profile
);
app.use("/inbox", inbox);
app.use("/lyp", lyp);
app.use("/bookproperty", bookproperty);
app.use("/transactionhistory", transactionHistory);
app.use("/buyproperty", buyproperty);

//Route for profile page with all details

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
