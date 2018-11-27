require("../config/passport");

const passport = require("passport");
var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

var requireAuth = passport.authenticate("jwt", { session: false });

router.post("/", function(req, res) {
  console.log("Inside Buy Property POST Request");

  console.log("Req Body : ", req.body);
  kafka.make_request("post_buyproperty", req.body, function(err, result) {
    console.log("In Book Property result :");
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
