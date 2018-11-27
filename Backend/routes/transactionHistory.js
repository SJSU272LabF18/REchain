require("../config/passport");

const passport = require("passport");
var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

var requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", function(req, res) {
  console.log("Inside Transaction History");
  console.log("Req Params : ", req.query);
  kafka.make_request("get_transaction_history", req.query, function(err, result) {
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

module.exports = router;