require("../config/passport");

const passport = require("passport");
var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

var requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", function(req, res) {
  console.log("Inside Profile Get Request");
  console.log("Req Params : ", req.query);
  kafka.make_request("get_profile", req.query, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.status(200).send(result);
    }
  });
});

router.post("/", function(req, res) {
  console.log("Inside Profile POST Request");
  console.log("Req Body : ", req.body);
  kafka.make_request("post_profile", req.body, function(err, result) {
    console.log("In Profile Book result :");
    console.log(result);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.sendStatus(200).end();
    }
  });
});

module.exports = router;
