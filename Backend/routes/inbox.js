require("../config/passport");

const passport = require("passport");
var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

var requireAuth = passport.authenticate("jwt", { session: false });

router.post("/sendmessage", function(req, res) {
  console.log("Inside Send Message POST Request");
  console.log("Req Body : ", req.body);
  kafka.make_request("post_sendmessage", req.body, function(err, result) {
    console.log("In Post Message result :");
    console.log(result);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.send(200).end();
    }
  });
});

router.get("/", function(req, res) {
  console.log("Inside Inbox GET request");
  console.log("Request body: ", req.query);
  kafka.make_request("get_inbox", req.query, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside INBOX else");
      console.log("INBOX results: ", result);
      res.status(200).send(result);
    }
  });
});

module.exports = router;
