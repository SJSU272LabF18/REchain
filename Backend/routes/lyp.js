require("../config/passport");

const passport = require("passport");
var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

var requireAuth = passport.authenticate("jwt", { session: false });

router.post("/", function(req, res) {
  console.log("Inside LYP POST Request");
  console.log("Req Body : ", req.body);
  kafka.make_request("post_lyp", req.body, function(err, result) {
    console.log("In List Property Result :");
    console.log(result);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      res.status(200).end(result);  
    }
  });
});

module.exports = router;
