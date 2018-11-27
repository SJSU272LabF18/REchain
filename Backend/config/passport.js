const mongoose = require("mongoose");
const passport = require("passport");
var Users = require("../models/user");

var ExtractJwt = require("passport-jwt").ExtractJwt;
var JwtStrategy = require("passport-jwt").Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "tasmanianDevil";

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    // console.log("PAYLOAD: ", payload);
    Users.findOne({ email: payload.email }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
